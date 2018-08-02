import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class OrderService {

  private url: string = `${environment.apiUrl}/api/Orders`
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  private cartObservable: BehaviorSubject<Cart> = new BehaviorSubject(new Cart(""));
  private cartItemsCountObservable: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  public listProducts(): Observable<any> {
    return this.http
      .get(`${this.url}`, { headers: this.headers });
  }

  public addToCart(username: string, product: Product, quantity: number): void {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    let cart: Cart;
    if (cartJSON) {
      cart = Cart.FromJSON(cartJSON);
      cart.addItem(product, quantity);
    }
    else {
      cart = new Cart(username);
      cart.addItem(product, quantity);
    }

    localStorage.setItem(key, JSON.stringify(cart));

    this.cartItemsCountObservable.next(cart.getItemQuantity());
    this.cartObservable.next(cart);
  }

  public removeFromCart(username: string, productId: number): void {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);

    let cart: Cart = Cart.FromJSON(cartJSON);
    cart.removeItem(productId);
    localStorage.setItem(key, JSON.stringify(cart));

    this.cartItemsCountObservable.next(cart.getItemQuantity());
    this.cartObservable.next(cart);
  }

  public getCartItemsCount(username: string): Observable<number> {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    let cart: Cart;
    if (cartJSON) {
      cart = Cart.FromJSON(cartJSON);
      this.cartItemsCountObservable.next(cart.getItemQuantity());
    }
    return this.cartItemsCountObservable;
  }

  public increaseItemQuantity(username: string, productId: number, quantity: number): void {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    if (cartJSON) {
      let cart = Cart.FromJSON(cartJSON);
      cart.increaseQuantity(productId, quantity);
      localStorage.setItem(key, JSON.stringify(cart));

      this.cartItemsCountObservable.next(cart.getItemQuantity());
      this.cartObservable.next(cart);
    }
  }

  public getCart(username: string): Cart {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    if (cartJSON) {
      return Cart.FromJSON(cartJSON);
    }
    return null;
  }

  public getCartObs(username: string): Observable<Cart> {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    if (cartJSON) {
      let cart = Cart.FromJSON(cartJSON);
      this.cartObservable.next(cart);
    }
    return this.cartObservable;
  }

  public submit(username: string): Promise<any> {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    let cart = Cart.FromJSON(cartJSON);
    return this.http.post(this.url, cart, { headers: this.headers }).toPromise();
  }

  public clear(username: string): void {
    let key = this.getCartKey(username);
    localStorage.removeItem(key);
    this.cartObservable.next(new Cart(""));
    this.cartItemsCountObservable.next(0);
  }

  public getOrders(username: string): Observable<any> {
    return this.http.get(`${this.url}/${username}`, { headers: this.headers });
  }

  public cancelOrder(orderId: number): Promise<any> {
    return this.http.post(`${this.url}/cancel`, { id: orderId }, { headers: this.headers }).toPromise();
  }

  private getCartKey(username: string): string {
    return `${username}_cart`;
  }

}

export class Product {
  constructor(public id: number, public name: string, public category: string, public price: number) {

  }
}

export class Cart {

  constructor(public username: string, public items: Array<CartItem> = new Array<CartItem>()) {

  }

  public static FromJSON(cartJSON: string): Cart {
    if (cartJSON === null || cartJSON === undefined)
      throw new Error("cartJSON can not be null or undefined");

    let cart = JSON.parse(cartJSON);

    let updatedCart = new Cart(cart.username);
    cart.items.forEach(item => {
      updatedCart.addItem(item.product, item.quantity);
    });
    return updatedCart;
  }

  public addItem(product: Product, quantity: number): void {
    let item = this.items.find(x => x.product.id === product.id);
    if (item) {
      item.quantity += quantity;
    }
    else {
      this.items.push(new CartItem(product, quantity));
    }
  }

  public increaseQuantity(productId: number, quantity: number): void {
    let item = this.items.find(x => x.product.id === productId);
    if (item) {
      item.quantity += quantity;
      if (item.quantity < 0) {
        item.quantity = 0;
      }
    }
  }

  public removeItem(productId: number): void {
    let item = this.items.find(x => x.product.id === productId);
    if (item) {
      let index = this.items.indexOf(item, 0);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    }
  }

  public getItemQuantity(): number {
    return this.items.reduce((ty, u) => ty + u.quantity, 0);
  }

  public getTotal(): number {
    return this.items.reduce((ty, u) => ty + (u.product.price * u.quantity), 0);
  }
}

export class CartItem {
  constructor(public product: Product, public quantity: number) {

  }

  public getTotal(): number {
    return this.product.price * this.quantity;
  }

}