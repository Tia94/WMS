import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsModule } from '../products/products.module';
import { VisibleForDirective } from './directives/visible-for.directive';

@NgModule({
  imports: [
    CommonModule,
    ProductsModule
  ],
  declarations: [LoginComponent, RegisterComponent, VisibleForDirective]
})
export class CoreModule { }
