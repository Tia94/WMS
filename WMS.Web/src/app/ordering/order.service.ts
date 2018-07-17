import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {

  private url: string = `${environment.apiUrl}/api/Orders`
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  public listProducts(): Observable<any> {
    return this.http
      .get(`${this.url}`, { headers: this.headers });
  }

  public addToCart(username: string, productId: number, quantity: number): void {
    debugger;

    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    let cart: Cart;
    if (cartJSON) {
      cart = Cart.FromJSON(cartJSON);
      cart.addItem(productId, quantity);
    }
    else {
      cart = new Cart(username);
      cart.addItem(productId, quantity);
    }

    localStorage.setItem(key, JSON.stringify(cart));
  }

  public removeFromCart(username: string, productId: number): void {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    debugger;
    let cart: Cart = Cart.FromJSON(cartJSON);
    cart.removeItem(productId);
    localStorage.setItem(key, JSON.stringify(cart));
  }

  public getCart(username: string): number {
    let key = this.getCartKey(username);
    let cartJSON = localStorage.getItem(key);
    if (cartJSON) {
      let cart = Cart.FromJSON(cartJSON);
      return cart.items.length;
    }
    return 0;
  }

  private getCartKey(username: string): string {
    return `${username}_cart`;
  }

}

class Cart {

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
      updatedCart.addItem(item.productId, item.quantity);
    });
    return updatedCart;
  }

  public addItem(productId: number, quantity: number): void {
    debugger;
    if (!this.items.some(x => x.productId === productId)) {
      this.items.push(new CartItem(productId, quantity));
    }
  }

  public updateItemQuantity(productId: number, quantity: number): void {
    let item = this.items.find(x => x.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  public removeItem(productId: number): void {
    let item = this.items.find(x => x.productId === productId);
    if (item) {
      let index = this.items.indexOf(item, 0);
      if (index > -1) {
        this.items.slice(index, 1);
      }
    }
  }

}

class CartItem {
  constructor(public productId: number, public quantity: number) {

  }

}