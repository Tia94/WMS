import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import "rxjs/add/operator/map";
import * as jwt_decode from "jwt-decode";
import { environment } from '../../../environments/environment';

export const TOKEN_NAME: string = "auth_token";

@Injectable()
export class AuthService {

  private url: string = `${environment.apiUrl}/api/auth`
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  public redirectUrl: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  public getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  public getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }

  public getUsername(): string {
    let token = localStorage.getItem(TOKEN_NAME);
    const decoded: any = jwt_decode(token);
    if (decoded.exp === undefined) return null;

    return decoded.sub;
  }

  public isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  public login(username: string, password: string) {
    this.http
      .post(`${this.url}/login`, { username: username, password: password }, { headers: this.headers })
      .subscribe((response: any) => {
        if (response && response.token) {
          localStorage.setItem(TOKEN_NAME, response.token);
          if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
            location.reload();
          } else {
            this.router.navigate(["."]);
            this.redirectUrl = null;
            location.reload();
          }
        }
      });
  }

  public logout(): void {
    localStorage.removeItem(TOKEN_NAME);
    location.reload();
  }

  public register(username: string, password: string, firstName: string, lastname: string, email: string,
    telephoneNumber: string, address: string): void {
    let dto: any = {
      username: username,
      password: password,
      firstName: firstName,
      lastname: lastname,
      email: email,
      telephoneNumber: telephoneNumber,
      address: address
    };

    this.http
      .post(`${this.url}/register`, dto, { headers: this.headers })
      .subscribe((response: any) => {
      });

  }
}
