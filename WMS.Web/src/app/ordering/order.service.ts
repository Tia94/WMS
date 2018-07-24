import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class OrderService {

  private url: string = `${environment.apiUrl}/api/Orders`
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  private cartItemsCountObservable: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  public listProducts(): Observable<any> {
    return this.http
      .get(`${this.url}`, { headers: this.headers });
  }

  public addToCart(username: string, product: Product, quantity: number): void {
    debugger;
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
  }

  public removeFromCart(username: string, productId: number): void {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);

    let cart: Cart = Cart.FromJSON(cartJSON);
    cart.removeItem(productId);
    localStorage.setItem(key, JSON.stringify(cart));
    this.cartItemsCountObservable.next(cart.getItemQuantity());
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

  public getCart(username: string): Cart {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    if (cartJSON) {
      return Cart.FromJSON(cartJSON);
    }
    return null;
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

  private _items: Array<CartItem>;
  public get items(): Array<CartItem> {
    return this._items;
  }

  constructor(public username: string) {
    this._items = new Array<CartItem>();
  }

  public static FromJSON(cartJSON: string): Cart {
    if (cartJSON === null || cartJSON === undefined)
      throw new Error("cartJSON can not be null or undefined");

    let cart = JSON.parse(cartJSON);

    let updatedCart = new Cart(cart.username);
    cart._items.forEach(item => {
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

  public updateItemQuantity(productId: number, quantity: number): void {
    let item = this.items.find(x => x.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  public removeItem(productId: number): void {
    let item = this.items.find(x => x.product.id === productId);
    if (item) {
      let index = this.items.indexOf(item, 0);
      if (index > -1) {
        this.items.slice(index, 1);
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

}