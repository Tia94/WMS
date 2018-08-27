import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../models/models';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  private orders: Array<Order> = new Array<Order>();
  public title: string = "Manage Orders";
  public cols: Array<any> = new Array<any>();
  public rows: Array<OrderRow> = new Array<OrderRow>();

  constructor(private orderService: OrderService) { }

  ngOnInit() {

    this.orderService.getOrders()
      .then(orders => {
        this.orders = orders;
        this.rows = orders.map(order => this.mapToRow(order));
      });

    this.cols = [
      { field: "number", header: "Number" },
      { field: "firstName", header: "First Name" },
      { field: "lastName", header: "Last Name" },
      { field: "status", header: "Status" },
      { field: "total", header: "Total" },
    ];
  }

  private mapToRow(order: Order): OrderRow {
    return new OrderRow(order.number, order.client.firstName, order.client.lastName, order.status, order.items.reduce((ty, u) => ty + u.price, 0));
  }


}

class OrderRow {
  constructor(public number: string, public firstName: string, public lastName: string, public status: string, public total: number) { }
}
