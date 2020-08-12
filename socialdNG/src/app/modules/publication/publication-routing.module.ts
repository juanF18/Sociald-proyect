import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicationCreationComponent } from './publication-creation/publication-creation.component';
import { PublicationEditionComponent } from './publication-edition/publication-edition.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationRemoveComponent } from './publication-remove/publication-remove.component';

const routes: Routes = [
  {
    path:'creation',
    component: PublicationCreationComponent
  },
  {
    path:'edition',
    component: PublicationEditionComponent
  },
  {
    path:'remove',
    component: PublicationRemoveComponent
  },
  {
    path:'**',
    component: PublicationListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule { }
