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
import { ButtonModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from './user.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';

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
  declarations: [ManageProductsComponent, ManageUsersComponent],
  providers: [ProductService, UserService]
})
export class ManagementModule { }
