import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductService } from './product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule, GrowlModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from './user.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OrderService } from '../management/order.service';

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
    InputTextModule,
    GrowlModule
  ],
  declarations: [ManageProductsComponent, ManageUsersComponent, ManageOrdersComponent],
  providers: [ProductService, UserService, MessageService, OrderService]
})
export class ManagementModule { }
