import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule, PaginatorModule, CardModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

import { OrderService } from './order.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ClientOrdersComponent } from './client-orders/client-orders.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    InputTextModule,
    PaginatorModule,
    MessagesModule,
    MessageModule,
    CardModule
  ],
  declarations: [ProductsListComponent, OrderDetailsComponent, ClientOrdersComponent],
  providers: [OrderService, MessageService]
})
export class OrderingModule { }
