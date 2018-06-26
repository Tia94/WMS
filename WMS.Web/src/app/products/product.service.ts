import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProductService {

  // private url: string = 'http://localhost:50234//api/Products';  // Patricia
  private url: string = "http://localhost:61796/api/Products";     // Rami
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient, private router: Router) { }

  public list(): Observable<any> {
    return this.http
      .get(this.url, { headers: this.headers });
  }

  list2() {
    return this.http.get(this.url, { headers: this.headers })
      .toPromise();
  }

  public get(id: number): Observable<any> {
    return this.http
      .get(`${this.url}/${id}`, { headers: this.headers });
  }

  public add(name: string, category: string, quantity: number, price: number): Observable<any> {
    return this.http
      .post(this.url, { name: name, category: category, quantity: quantity, price: price }, { headers: this.headers });
  }

  public delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.headers });;
  }

  public update(id: number, name: string, category: string, quantity: number, price: number): Observable<any> {
    return this.http
      .put(`${this.url}/${id}`, { name: name, category: category, quantity: quantity, price: price }, { headers: this.headers });
  }

}
