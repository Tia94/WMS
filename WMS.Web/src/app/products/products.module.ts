import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ProductService } from './product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule } from '@angular/router';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    Ng2TableModule,
    FormsModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [ProductsListComponent, AddProductComponent, UpdateProductComponent],
  providers: [ProductService]
})
export class ProductsModule { }
