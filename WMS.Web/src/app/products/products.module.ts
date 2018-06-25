import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ProductService } from './product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    Ng2TableModule,
    FormsModule,
    PaginationModule.forRoot(),
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [ProductsListComponent, ProductsHomeComponent, AddProductComponent],
  providers: [ProductService]
})
export class ProductsModule { }
