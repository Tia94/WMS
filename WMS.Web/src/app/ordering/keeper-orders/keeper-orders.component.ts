import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order, OrderItemRow } from '../models/keeper';

@Component({
  selector: 'app-keeper-orders',
  templateUrl: './keeper-orders.component.html',
  styleUrls: ['./keeper-orders.component.css']
})
export class KeeperOrdersComponent implements OnInit {

  public title: string = "My Work";
  public rowGroupMetadata: any = {};
  public rows: Array<OrderItemRow> = new Array<OrderItemRow>();

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getKeeperOrders()
      .subscribe(orders => {
        orders.forEach(order => {
          order.items.forEach(item => {
            let row = new OrderItemRow(order, item.product, item.quantity);
            this.rows.push(row);
          });
        });

        this.updateRowGroupMetaData();
      });

  }

  updateRowGroupMetaData() {
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
