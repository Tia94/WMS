import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ProductsModule } from './products/products.module';
import { AuthService } from './core/services/auth.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { VisibleForDirective } from './core/directives/visible-for.directive';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsListComponent, pathMatch: "full", canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    VisibleForDirective
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(appRoutes, { enableTracing: true }), // <-- debugging purposes only
    RouterModule.forRoot(appRoutes), // <-- debugging purposes only
    HttpClientModule,
    ReactiveFormsModule,
    ProductsModule
  ],
  providers: [AuthGuard, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
