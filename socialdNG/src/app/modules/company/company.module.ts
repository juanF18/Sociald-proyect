import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule
  ]
})
export class CompanyModule { }
