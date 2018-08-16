import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from "jwt-decode";
import { inherits } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    debugger;
    if (this.authService.isLoggedIn()) {
      debugger;
      let role = Role.from(this.getLoggedInUserRole());
      if (!role.HasAccessTo(state.url)) {
        this.router.navigate(["/pageNotFound"]);
      }
      return true;
    }

    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }

  private getLoggedInUserRole(): string {
    let token = this.authService.getToken();
    const decoded: any = jwt_decode(token);
    if (decoded.exp === undefined)
      return null;

    return decoded.role.toLowerCase();
  }
}

abstract class Role {
  protected abstract actions: Array<string>;

  public HasAccessTo(action: string): boolean {
    return this.actions.some(x => action === x);
  }

  public static from(role: string): Role {
    switch (role.toLowerCase()) {
      case "admin": return new Admin();
      case "client": return new Client();
      case "keeper": return new Keeper();
    }
    return null;
  }

}

class Client extends Role {
  protected actions: string[] = ["/products", "/order/details", "/order/list"];
}

class Admin extends Role {
  protected actions: string[];
  public HasAccessTo(action: string): boolean {
    return true;
  }
}

class Keeper extends Role {
  protected actions: string[] = ["/keeper/orders"];
}

