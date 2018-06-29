import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private url: string = `${environment.apiUrl}/api/Users`
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

  public add(username: string, password: string, firstname: string, lastname: string, email: string, telephoneNumber: string, address: string,
    role: string, isActive: boolean): Observable<any> {
    return this.http
      .post(this.url, {
        username: username, password: password, firstname: firstname, lastname: lastname, email: email, telephoneNumber: telephoneNumber,
        address: address, role: role, isActive: isActive
      }, { headers: this.headers });
  }

  public delete(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.headers });;
  }

  public update(id: number, username: string, password: string, firstname: string, lastname: string, email: string, telephoneNumber: string, address: string,
    role: string, isActive: boolean): Observable<any> {
    return this.http
      .put(`${this.url}/${id}`, {
        name: name, username: username, password: password, firstname: firstname, lastname: lastname, email: email, telephoneNumber: telephoneNumber,
        address: address, role: role, isActive: isActive
      }, { headers: this.headers });
  }

}
