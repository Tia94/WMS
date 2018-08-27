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
  public rows: Array<OrderRow> = new Array<OrderRow>();
  public displaySummary: boolean = false;
  public displayDetails: boolean = false;
  public summary: OrderSummary = new OrderSummary();

  public cols: Array<any> = [];
  public orderItemcols: Array<any> = [];
  public orderHistoryCols: Array<any> = [];

  public selectedOrder: Order = null;
  public selectedOrderItems: Array<OrderItemRow> = [];
  public selectedOrderHistory: Array<OrderHistoryRow> = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {

    this.orderService.getOrders()
      .then(orders => {
        this.orders = orders;
        this.rows = orders.map(order => this.mapToRow(order));
        this.setSummary();
        this.selectedOrder = orders[0];
      });

    this.cols = [
      { field: "number", header: "Number" },
      { field: "firstName", header: "First Name" },
      { field: "lastName", header: "Last Name" },
      { field: "status", header: "Status" },
      { field: "total", header: "Total" },
    ];

    this.orderItemcols = [
      { field: "name", header: "Product Name" },
      { field: "category", header: "Product Category" },
      { field: "quantity", header: "Quantity" },
      { field: "price", header: "Price" }
    ];

    this.orderHistoryCols = [
      { field: "status", header: "Status" },
      { field: "date", header: "Date" }
    ];
  }

  public showSummaryDialog(): void {
    this.displaySummary = true;
  }

  public closeSummaryDialog(): void {
    this.displaySummary = false;
  }

  public setSummary(): void {
    let count: number = this.orders.length;
    let total: number = this.orders.reduce((acc, order) => acc + order.total, 0);
    let highest: number = Math.max(...this.orders.map(x => x.total));
    let lowest: number = Math.min(...this.orders.map(x => x.total));
    this.summary = new OrderSummary(count, total, highest, lowest);
  }

  public onSelectOrder(event): void {
    this.selectedOrder = this.orders.find(x => x.id === event.data.id);
    this.selectedOrderItems = this.selectedOrder.items.map(item => new OrderItemRow(item.product.name, item.product.category, item.quantity, item.price));
    this.orderService.getOrderHistory(event.data.id)
      .then(history => {
        this.selectedOrderHistory = history.map(x => new OrderHistoryRow(x.status, x.date.toLocaleString()))
      });

    this.displayDetails = true;
  }

  public closeDetailsDialog(): void {
    this.displayDetails = false;
  }

  private mapToRow(order: Order): OrderRow {
    return new OrderRow(order.id, order.number, order.client.firstName, order.client.lastName, order.status, order.total);
  }
}

class OrderRow {
  constructor(public id: number, public number: string, public firstName: string, public lastName: string, public status: string, public total: number) { }
}

class OrderItemRow {
  constructor(public name: string, public category, public quantity: number, public price: number) { }
}

class OrderSummary {
  constructor(public count: number = 0, public total: number = 0, public highest: number = 0, public lowest: number = 0) { }
}

class OrderHistoryRow {
  constructor(public status: string, public date: Date) { }
}
