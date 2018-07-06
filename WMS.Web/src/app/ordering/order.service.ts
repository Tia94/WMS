import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {

  private url: string = `${environment.apiUrl}/api/Orders`
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  listProducts(): Observable<any> {
    return Observable.from([
      { name: 'product 1', category: 'A', price: 500, inStock: true },
      { name: 'product 2', category: 'A', price: 400, inStock: true },
      { name: 'product 3', category: 'B', price: 300, inStock: true },
      { name: 'product 4', category: 'B', price: 250, inStock: true }
    ]);

    // return this.http
    // .get(`${this.url}/products`, { headers: this.headers });
  }

}
