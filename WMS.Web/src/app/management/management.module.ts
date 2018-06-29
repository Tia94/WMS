import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductService } from './product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/primeng';
import { UsersListComponent } from './users-list/users-list.component';
import { UserService } from './user.service';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

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
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    InputTextModule
  ],
  declarations: [ProductsListComponent, UsersListComponent],
  providers: [ProductService, UserService]
})
export class ManagementModule { }
