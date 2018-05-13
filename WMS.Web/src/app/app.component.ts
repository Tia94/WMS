import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

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

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.isLoggedIn = !this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      let decoded: any = jwt_decode(this.authService.getToken());
      this.username = decoded.sub;
      this.role = decoded.role;
    }
  }

  public logout(): void {
    this.authService.logout();
  }
}
