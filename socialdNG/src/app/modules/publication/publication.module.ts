import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationEditionComponent } from './publication-edition/publication-edition.component';
import { PublicationRemoveComponent } from './publication-remove/publication-remove.component';
import { PublicationCreationComponent } from './publication-creation/publication-creation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { cloud } from '../../config/cloudinary-config';
import * as cloudinary from 'cloudinary-core'


@NgModule({
  declarations: [PublicationListComponent, PublicationEditionComponent, PublicationRemoveComponent, PublicationCreationComponent],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FileUploadModule,
    CloudinaryModule.forRoot(cloudinary, cloud.config),
    FormsModule,
  ]
})
export class PublicationModule { }
