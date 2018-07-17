import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { OrderService } from './ordering/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public appName: string = "WMS";
  public isLoggedIn: boolean = false;
  public username: string = "";
  public role: string = "";
  public cartItemsCount: number = 0;

  constructor(private authService: AuthService, private router: Router, private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      let decoded: any = jwt_decode(this.authService.getToken());
      this.username = decoded.sub;
      this.role = decoded.role;
    }

    let username = this.authService.getUsername();
    this.cartItemsCount = this.orderService.getCart(username);
  }

  public logout(): void {
    this.authService.logout();
  }
}
