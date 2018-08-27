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
  public displaySummary: boolean = false;
  public summary: OrderSummary = new OrderSummary();

  constructor(private orderService: OrderService) { }

  ngOnInit() {

    this.orderService.getOrders()
      .then(orders => {
        this.orders = orders;
        this.rows = orders.map(order => this.mapToRow(order));
        this.setSummary();
      });

    this.cols = [
      { field: "number", header: "Number" },
      { field: "firstName", header: "First Name" },
      { field: "lastName", header: "Last Name" },
      { field: "status", header: "Status" },
      { field: "total", header: "Total" },
    ];
  }

  public showDialog(): void {
    this.displaySummary = true;
  }

  closeDialog() {
    this.displaySummary = false;
  }

  public setSummary(): void {
    let count: number = this.orders.length;
    let total: number = this.orders.reduce((acc, order) => acc + order.total, 0);
    let highest: number = Math.max(...this.orders.map(x => x.total));
    let lowest: number = Math.min(...this.orders.map(x => x.total));
    this.summary = new OrderSummary(count, total, highest, lowest);
  }


  private mapToRow(order: Order): OrderRow {
    return new OrderRow(order.number, order.client.firstName, order.client.lastName, order.status, order.items.reduce((ty, u) => ty + u.price, 0));
  }
}

class OrderRow {
  constructor(public number: string, public firstName: string, public lastName: string, public status: string, public total: number) { }
}

class OrderSummary {
  constructor(public count: number = 0, public total: number = 0, public highest: number = 0, public lowest: number = 0) { }
}
