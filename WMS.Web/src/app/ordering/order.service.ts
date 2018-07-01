import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

  private url: string = `${environment.apiUrl}/api/Orders`
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  listProducts(): any {
    return this.http
      .get(`${this.url}/products`, { headers: this.headers });
  }

}
