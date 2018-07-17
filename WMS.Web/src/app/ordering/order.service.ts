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
    let key = this.orderKey(username);
    let orderJSON = localStorage.getItem(key);
    debugger;
    let order: Order;
    if (orderJSON) {
      order = JSON.parse(orderJSON) as Order;
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
    if (!orderJSON) {
      throw new Error("Order does not exist");
    }
    let order: Order = JSON.parse(orderJSON) as Order;
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

  public addProduct(productId: number): void {
    if (!this.products.some(x => x === productId))
      this.products.push(productId);
  }

  public removeProduct(productId: number): void {
    let index = this.products.indexOf(productId, 0);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

}
