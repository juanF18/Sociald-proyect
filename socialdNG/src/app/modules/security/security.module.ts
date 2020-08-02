import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetComponent } from './reset/reset.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [LoginComponent, LogoutComponent, ResetComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
