import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  private subscription: ISubscription;

  public title: string = "Products";
  public products: Array<any> = new Array<any>();
  public product: any;
  public selectedProduct: any;
  public newProduct: boolean;
  public displayDialog: boolean;

  public cols: Array<any> = new Array<any>();

  constructor(private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.subscription = this.orderService.listProducts().subscribe(data => this.products = data);

    this.cols = [
      { field: "name", header: "Name" },
      { field: "category", header: "Category" },
      { field: "quantity", header: "Quantity" },
      { field: "price", header: "Price" },
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
