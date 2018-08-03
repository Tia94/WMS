import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../../core/services/auth.service';
import { ISubscription } from 'rxjs/Subscription';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.css']
})
export class ClientOrdersComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;

  public title: string = "My Orders";
  public orders: Array<any> = new Array<any>();

  constructor(private orderService: OrderService, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    this.refreshOrders();
    this.subscription = this.orderService.getClientOrders()
      .subscribe(data => {
        this.orders = data;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public cancel(orderId: number, orderNumber: string): void {
    this.orderService.cancelOrder(orderId)
      .then(_ => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order ${orderNumber} was canceled successfully.` });
        this.refreshOrders();
      });
  }

  private refreshOrders(): void {
    let username = this.authService.getUsername();
    this.orderService.refreshClientOrders(username);
  }

}
