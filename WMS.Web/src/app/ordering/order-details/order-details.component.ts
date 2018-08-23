import { Component, OnInit } from '@angular/core';
import { OrderService, Cart, Product } from '../order.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public title: string = "Order Details";
  public cart: Cart;

  constructor(private orderService: OrderService, private authService: AuthService, private router: Router, private messageService:MessageService) {

  }

  ngOnInit() {
    let username = this.authService.getUsername();
    this.cart = this.orderService.getCart(username);

    this.orderService.getCartObs(username)
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  public updateItemQuantity(product: Product, quantity: number): void {
    let username = this.authService.getUsername();
    this.orderService.increaseItemQuantity(username, product.id, quantity);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product '${product.name}' quantity was updated successfully.` });
  }

  public removeItem(product: Product): void {
    let username = this.authService.getUsername();
    this.orderService.removeFromCart(username, product.id);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product '${product.name}' was removed from cart successfully.` });
  }

  public submit(): void {
    let username = this.authService.getUsername();
    this.orderService.submit(username).then(_ => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order was submitted successfully.` });
      this.orderService.clear(username);
      this.router.navigate(["/products"]);
    });
  }

  public hasCart(): boolean {
    return this.cart.username.trim() !== "" && this.cart.items.length > 0;
  }

}
