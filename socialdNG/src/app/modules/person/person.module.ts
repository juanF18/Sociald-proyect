import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ReactiveFormsModule,
  ],
  
})
export class PersonModule { }
