import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationEditionComponent } from './publication-edition/publication-edition.component';
import { PublicationRemoveComponent } from './publication-remove/publication-remove.component';
import { PublicationCreationComponent } from './publication-creation/publication-creation.component';


@NgModule({
  declarations: [PublicationListComponent, PublicationEditionComponent, PublicationRemoveComponent, PublicationCreationComponent],
  imports: [
    CommonModule,
    PublicationRoutingModule
  ]
})
export class PublicationModule { }
