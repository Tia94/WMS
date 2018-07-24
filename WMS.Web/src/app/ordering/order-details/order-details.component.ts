import { Component, OnInit } from '@angular/core';
import { OrderService, Cart } from '../order.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public cart: Cart;

  constructor(private orderService: OrderService, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    let username = this.authService.getUsername();
    this.cart = this.orderService.getCart(username);

    this.orderService.getCartObs(username)
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  public updateItemQuantity(productId: number, quantity: number): void {
    let username = this.authService.getUsername();
    this.orderService.increaseItemQuantity(username, productId, quantity);
  }

  public removeItem(productId: number): void {
    let username = this.authService.getUsername();
    this.orderService.removeFromCart(username, productId);
  }

  public submit(): void {
    let username = this.authService.getUsername();
    this.orderService.submit(username);
    this.router.navigate["/products"];
  }

}
