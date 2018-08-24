import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VisibleForDirective } from './directives/visible-for.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ButtonModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  declarations: [LoginComponent, RegisterComponent, VisibleForDirective, PageNotFoundComponent]
})
export class CoreModule { }
