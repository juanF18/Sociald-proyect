import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FileUploadModule } from "ng2-file-upload";
import {CloudinaryModule, } from '@cloudinary/angular-5.x'



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ReactiveFormsModule,
    FileUploadModule,
    CloudinaryModule
  ],
  
})
export class PersonModule { }
