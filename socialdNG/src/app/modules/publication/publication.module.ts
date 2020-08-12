import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationEditionComponent } from './publication-edition/publication-edition.component';
import { PublicationRemoveComponent } from './publication-remove/publication-remove.component';
import { PublicationCreationComponent } from './publication-creation/publication-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [PublicationListComponent, PublicationEditionComponent, PublicationRemoveComponent, PublicationCreationComponent],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class PublicationModule { }
