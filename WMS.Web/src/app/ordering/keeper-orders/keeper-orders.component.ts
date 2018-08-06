import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderItemRow } from '../models/keeper';
import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-keeper-orders',
  templateUrl: './keeper-orders.component.html',
  styleUrls: ['./keeper-orders.component.css']
})
export class KeeperOrdersComponent implements OnInit {

  public title: string = "My Work";
  public rowGroupMetadata: any = {};
  public rows: Array<OrderItemRow> = new Array<OrderItemRow>();

  constructor(private orderService: OrderService, private messageService: MessageService, private authService: AuthService) { }

  ngOnInit() {

    setInterval(() => {
      this.orderService.refreshKeeperOrders();
    }, 10000);

    this.orderService.getKeeperOrders()
      .subscribe(orders => {
        this.rows = new Array<OrderItemRow>();

        orders.forEach(order => {
          order.items.forEach(item => {
            let row = new OrderItemRow(order, item.product, item.quantity);
            this.rows.push(row);
          });
        });

        this.updateRowGroupMetaData();
      });

  }

  public start(orderId: number, orderNumber: string): void {
    this.orderService.startProcessing(orderId)
      .then(_ => {
        let username = this.authService.getUsername();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order '${orderNumber}' is now being processed by '${username}'.` });
        this.orderService.refreshKeeperOrders();
      });
  }

  public finish(orderId: number, orderNumber: string): void {
    this.orderService.finishProcessing(orderId)
      .then(_ => {
        let username = this.authService.getUsername();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Processing order '${orderNumber}' by '${username}' is done.` });
        this.orderService.refreshKeeperOrders();
      });
  }

  private updateRowGroupMetaData(): void {
    this.rowGroupMetadata = {};
    if (this.rows) {
      for (let i = 0; i < this.rows.length; i++) {
        let rowData = this.rows[i];
        let orderId = rowData.order.id;
        if (i == 0) {
          this.rowGroupMetadata[orderId] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.rows[i - 1];
          let previousRowGroup = previousRowData.order.id;
          if (orderId === previousRowGroup)
            this.rowGroupMetadata[orderId].size++;
          else
            this.rowGroupMetadata[orderId] = { index: i, size: 1 };
        }
      }
    }
  }
}
