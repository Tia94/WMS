import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;

  public title: string = "Manage Products";
  public products: Array<any> = new Array<any>();
  public product: any;
  public selectedProduct: any;
  public newProduct: boolean;
  public displayDialog: boolean;

  public cols: Array<any> = new Array<any>();

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.subscription = this.productService.list().subscribe(data => this.products = data);

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

  showDialog() {
    this.newProduct = true;
    this.product = {};
    this.displayDialog = true;
  }

  closeDialog() {
    this.newProduct = false;
    this.product = null;
    this.displayDialog = false;
  }

  save() {
    let products = [...this.products];
    if (this.newProduct) {
      products.push(this.product);
      this.productService.add(this.product.name, this.product.category, this.product.quantity, this.product.price)
        .subscribe(response => {
        });
    }
    else {
      products[this.products.indexOf(this.selectedProduct)] = this.product;
      this.productService.update(this.product.id, this.product.name, this.product.category, this.product.quantity, this.product.price)
        .subscribe(response => {
        });
    }

    this.products = products;
    this.closeDialog();
  }

  delete() {
    let index = this.products.indexOf(this.selectedProduct);

    if (index !== -1) {
      this.productService.delete(this.selectedProduct.id)
        .subscribe(response => {
          this.products = this.products.filter((val, i) => i != index);
          this.closeDialog();
        });
    }
  }

  onRowSelect(event) {
    this.newProduct = false;
    this.product = this.cloneProduct(event.data);
    this.displayDialog = true;
  }

  cloneProduct(c: any): any {
    let product = {};
    for (let prop in c) {
      product[prop] = c[prop];
    }
    return product;
  }

}
