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

    let key = this.orderKey(username);
    let orderJSON = localStorage.getItem(key);
    let order: Order;
    if (orderJSON) {
      order = Order.FromJSON(orderJSON);
      order.addItem(productId, quantity);
    }
    else {
      order = new Order(username);
      order.addItem(productId, quantity);
    }

    localStorage.setItem(key, JSON.stringify(order));
  }

  public removeFromCart(username: string, productId: number): void {
    let key = this.orderKey(username);
    let orderJSON = localStorage.getItem(key);
    debugger;
    let order: Order = Order.FromJSON(orderJSON);
    order.removeItem(productId);
    localStorage.setItem(key, JSON.stringify(order));
  }

  private orderKey(username: string): string {
    return `${username}_order`;
  }

}

class Order {

  private _items: Array<OrderItem>;
  public get items(): Array<OrderItem> {
    return this._items;
  }

  constructor(public username: string) {

  }

  public static FromJSON(orderJSON: string): Order {
    if (orderJSON === null || orderJSON === undefined)
      throw new Error("orderJSON can not be null or undefined");

    return JSON.parse(orderJSON) as Order;
  }

  public addItem(productId: number, quantity: number): void {
    if (!this.items.some(x => x.productId === productId)) {
      this.items.push(new OrderItem(productId, quantity));
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

class OrderItem {
  constructor(public productId: number, public quantity: number) {

  }

}