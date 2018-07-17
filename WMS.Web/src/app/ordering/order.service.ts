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

  public addToCart(username: string, productId: number): void {
    debugger;

    let key = this.orderKey(username);
    let orderJSON = localStorage.getItem(key);
    let order: Order;
    if (orderJSON) {
      order = Order.FromJSON(orderJSON);
      order.addProduct(productId);
    }
    else {
      order = new Order(username, [productId]);
    }

    localStorage.setItem(key, JSON.stringify(order));
  }

  public removeFromCart(username: string, productId: number): void {
    let key = this.orderKey(username);
    let orderJSON = localStorage.getItem(key);
    debugger;
    let order: Order = Order.FromJSON(orderJSON);
    order.removeProduct(productId);
    localStorage.setItem(key, JSON.stringify(order));
  }

  private orderKey(username: string): string {
    return `${username}_order`;
  }

}

class Order {
  constructor(public username: string, public products: Array<number> = new Array<number>()) {

  }

  public static FromJSON(orderJSON: string): Order {
    if (orderJSON === null || orderJSON === undefined)
      throw new Error("orderJSON can not be null or undefined");

    let order: Order = JSON.parse(orderJSON) as Order;
    return new Order(order.username, order.products);
  }

  addProduct(productId: number): void {
    if (!this.products.some(x => x === productId))
      this.products.push(productId);
  }

  removeProduct(productId: number): void {
    let index = this.products.indexOf(productId, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

}
