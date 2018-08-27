import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderItemRow } from '../models/keeper';
import { MessageService } from 'primeng/components/common/messageservice';
import { AuthService } from '../../core/services/auth.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-keeper-orders',
  templateUrl: './keeper-orders.component.html',
  styleUrls: ['./keeper-orders.component.css']
})
export class KeeperOrdersComponent implements OnInit {

  public title: string = "My Work";
  public rowGroupMetadata: any = {};
  public rows: Array<OrderItemRow> = new Array<OrderItemRow>();

  public number: string = "";
  public status: string = "";
  public statuses: Array<SelectItem> = [{ label: "Any status", value: "" }];

  constructor(private orderService: OrderService, private messageService: MessageService, private authService: AuthService) { }

  ngOnInit() {
    this.orderService.getOrderStatuses()
      .then((statuses: Array<string>) => {
        statuses.forEach(status => {
          this.statuses.push({ label: status, value: status });
        });
      })

    this.orderService.refreshKeeperOrders();

    setInterval(() => {
      this.orderService.refreshKeeperOrders();
    }, 10000);

    this.orderService.getKeeperOrders()
      .subscribe(orders => {
        this.rows = new Array<OrderItemRow>();

        orders.forEach(order => {
          order.items.forEach(item => {
            let row = new OrderItemRow(order, item.product, item.quantity);
            if (this.shouldAddRow(row)) {
              this.rows.push(row);
            }
          });
        });

        this.updateRowGroupMetaData();
      });

  }

  public startPacking(orderId: number, orderNumber: string): void {
    this.orderService.startPacking(orderId)
      .then(_ => {
        let username = this.authService.getUsername();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order '${orderNumber}' is now being packed by '${username}'.` });
        this.orderService.refreshKeeperOrders();
      });
  }

  public finishPacking(orderId: number, orderNumber: string): void {
    this.orderService.finishPacking(orderId)
      .then(_ => {
        let username = this.authService.getUsername();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order '${orderNumber}' is now packed by '${username}'.` });
        this.orderService.refreshKeeperOrders();
      });
  }

  public send(orderId: number, orderNumber: string): void {
    this.orderService.send(orderId)
      .then(_ => {
        let username = this.authService.getUsername();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order '${orderNumber}' is sent to driver by '${username}'.` });
        this.orderService.refreshKeeperOrders();
      });
  }

  public finish(orderId: number, orderNumber: string): void {
    this.orderService.finish(orderId)
      .then(_ => {
        let username = this.authService.getUsername();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order '${orderNumber}' is now set as delivered by '${username}'.` });
        this.orderService.refreshKeeperOrders();
      });
  }

  public search(): void {
    this.orderService.refreshKeeperOrders();
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

  private shouldAddRow(row: any): boolean {
    let shouldAdd: boolean = true;
    let filterByNumber: boolean = this.number.trim() !== "";
    let filterByStatus: boolean = this.status.trim() !== "";

    if (filterByNumber) {
      if (row.order.number !== this.number.trim()) {
        shouldAdd = false;
      }
    }

    if (filterByStatus) {
      if (row.order.status !== this.status.trim()) {
        shouldAdd = false;
      }
    }

    return shouldAdd;
  }

}
