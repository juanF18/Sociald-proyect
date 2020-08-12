import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadPicsRoutingModule } from './upload-pics-routing.module';
import { CloudImgComponent } from './cloud-img/cloud-img.component';
import * as cloudinary from 'cloudinary-core'
import { FileUploadModule } from "ng2-file-upload";
import {CloudinaryModule, } from '@cloudinary/angular-5.x'
import { cloud } from '../../config/cloudinary-config';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CloudImgComponent],
  imports: [
    CommonModule,
    UploadPicsRoutingModule,
    FileUploadModule,
    CloudinaryModule.forRoot(cloudinary, cloud.config),
    FormsModule,
  ]
})
export class UploadPicsModule { }
