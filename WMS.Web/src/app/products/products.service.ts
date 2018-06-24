import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';

@Injectable()
export class ProductsService {

  private url: string = 'http://localhost:50234//api/Products';  // Patricia
  //private url: string = "http://localhost:61796/api/Products";     // Rami
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) { }

  public get(): Observable<any> {
    return this.http
      .get(`${this.url}`, { headers: this.headers });
  }
}
