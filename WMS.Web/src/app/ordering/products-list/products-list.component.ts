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
  private rowSize: number = 4;

  public title: string = "Products";
  public products: Array<any> = new Array<any>();
  public productGroups: Array<any> = new Array<any>();

  constructor(private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.subscription = this.orderService.listProducts().subscribe(data => {
      this.products = data;

      for (let i = 0; i < this.products.length; i += this.rowSize) {
        let batch = this.products.filter((value, index) => index >= i).filter((value, index) => index < this.rowSize);
        this.productGroups.push(batch);
      }

    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
