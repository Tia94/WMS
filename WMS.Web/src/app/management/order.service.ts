import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Order } from './models/models';

@Injectable()
export class OrderService {

  private url: string = `${environment.apiUrl}/api/Orders`
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  public getOrders(): Promise<Array<Order>> {
    return this.http.get(`${this.url}/adminOrders`, { headers: this.headers })
      .map(data => <Array<Order>>data)
      .toPromise();
  }


}
