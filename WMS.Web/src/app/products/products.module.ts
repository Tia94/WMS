import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { ProductsService } from './products.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
    Ng2TableModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  declarations: [ProductsListComponent],
  providers: [ProductsService]
})
export class ProductsModule { }
