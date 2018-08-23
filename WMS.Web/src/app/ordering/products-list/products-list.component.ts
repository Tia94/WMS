import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { OrderService } from '../order.service';
import { AuthService } from '../../core/services/auth.service';

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

  public name: string = "";
  public category: string = "";
  public priceRangeMin: number = 1;
  public priceRangeMax: number = 999999;
  public priceRange: Array<number> = [1, 100000];

  constructor(private orderService: OrderService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.subscription = this.orderService.listProducts().subscribe(data => {
      this.products = data;
      this.InitializeProductGroups(this.products);

    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addToCart(product: any): void {
    let username = this.authService.getUsername();

    this.orderService.addToCart(username, product, 1);
  }

  public search(): void {
    let filtered = this.products.filter(x =>
      (this.name.trim() === "" || this.contains(x.name, this.name)) &&
      (this.category.trim() === "" || this.contains(x.category, this.category)) &&
      x.price >= this.priceRange[0] && x.price <= this.priceRange[1]);

    this.InitializeProductGroups(filtered);
  }

  private InitializeProductGroups(products: Array<any>) {
    this.productGroups = [];
    for (let i = 0; i < products.length; i += this.rowSize) {
      let batch = products.filter((value, index) => index >= i).filter((value, index) => index < this.rowSize);
      this.productGroups.push(batch);
    }
  }

  private contains(source: string, substring: string): boolean {
    return source.toLowerCase().indexOf(substring.toLowerCase()) >= 0;
  }

}
