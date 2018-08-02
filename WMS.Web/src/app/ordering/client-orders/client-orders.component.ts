import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../../core/services/auth.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit, OnDestroy {

  private orders: Array<any> = new Array<any>();
  private subscription: ISubscription;
  public title: string = "My Orders";

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    let username = this.authService.getUsername();
    this.subscription = this.orderService.getOrders(username)
      .subscribe(data => {
        this.orders = data;
      });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public cancel(orderId: number): void {
    this.orderService.cancelOrder(orderId)
      .then(_ => {
        location.reload();
      });

  }


}
