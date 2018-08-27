import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManageProductsComponent } from './management/manage-products/manage-products.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ManagementModule } from './management/management.module';
import { AuthService } from './core/services/auth.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { VisibleForDirective } from './core/directives/visible-for.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageUsersComponent } from './management/manage-users/manage-users.component';
import { CardModule } from 'primeng/card';
import { ButtonModule, GrowlModule } from 'primeng/primeng';
import { OrderingModule } from './ordering/ordering.module';
import { ProductsListComponent } from './ordering/products-list/products-list.component';
import { OrderDetailsComponent } from './ordering/order-details/order-details.component';
import { ClientOrdersComponent } from './ordering/client-orders/client-orders.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/components/common/messageservice';
import { KeeperOrdersComponent } from './ordering/keeper-orders/keeper-orders.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ManageOrdersComponent } from './management/manage-orders/manage-orders.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pagenotfound', component: PageNotFoundComponent, pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsListComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: 'manage/products', component: ManageProductsComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: 'manage/users', component: ManageUsersComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: 'manage/orders', component: ManageOrdersComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: 'order/details', component: OrderDetailsComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: 'order/list', component: ClientOrdersComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: 'keeper/orders', component: KeeperOrdersComponent, pathMatch: "full", canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    VisibleForDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    // RouterModule.forRoot(appRoutes, { enableTracing: true }), // <-- debugging purposes only
    RouterModule.forRoot(appRoutes), // <-- debugging purposes only
    HttpClientModule,
    ReactiveFormsModule,
    ManagementModule,
    OrderingModule,
    CardModule,
    ButtonModule,
    GrowlModule
  ],
  providers: [AuthGuard, AuthService, MessageService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
