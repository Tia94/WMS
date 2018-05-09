import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsModule } from '../products/products.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class CoreModule { }
