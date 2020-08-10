import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CloudinaryModule, CloudinaryConfiguration } from "@cloudinary/angular-5.x";
import {Cloudinary as CloudinaryCore} from "cloudinary-core";
import { Cloudinary } from "@cloudinary/angular-5.x/lib/cloudinary.service";
import {cloud} from "../../config/cloudinary-config";
import { FileSelectDirective, FileUploader, FileUploadModule } from "ng2-file-upload";

export const cloudinary ={
  Cloudinary:CloudinaryCore
}

export const config: CloudinaryConfiguration = {
  cloud_name: cloud.CLOUD_NAME,
  upload_preset: cloud.UPLOAD_PRESET
}

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ReactiveFormsModule,
    FileUploadModule,
    CloudinaryModule.forRoot(cloudinary, config)
  ]
})
export class PersonModule { }
