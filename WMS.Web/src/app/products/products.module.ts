import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductService } from './product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule } from '@angular/router';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ButtonModule
  ],
  declarations: [ProductsListComponent, AddProductComponent, UpdateProductComponent],
  providers: [ProductService]
})
export class ProductsModule { }
