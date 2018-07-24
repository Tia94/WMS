import { Component, OnInit } from '@angular/core';
import { OrderService, Cart } from '../order.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public cart: Cart;

  constructor(private orderService: OrderService, private authService: AuthService) {

  }

  ngOnInit() {
    let username = this.authService.getUsername();
    this.cart = this.orderService.getCart(username);
    this.cart.items[0].product.name
  }

}
