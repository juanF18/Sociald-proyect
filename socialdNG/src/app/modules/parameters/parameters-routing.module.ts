import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaListComponent } from './area/area-list/area-list.component';
import { AreaCreationComponent } from './area/area-creation/area-creation.component';
import { AreaEditionComponent } from './area/area-edition/area-edition.component';
import { CategoryCreationComponent } from './category/category-creation/category-creation.component';
import { CategoryRemoveComponent } from './category/category-remove/category-remove.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryEditionComponent } from './category/category-edition/category-edition.component';
import { PublicationRequestCreationComponent } from './publication-request/publication-request-creation/publication-request-creation.component';
import { PublicationRequestListComponent } from './publication-request/publication-request-list/publication-request-list.component';
import { PublicationRequestRemoveComponent } from './publication-request/publication-request-remove/publication-request-remove.component';
import { PublicationRequestEditionComponent } from './publication-request/publication-request-edition/publication-request-edition.component';
import { SkillCreationComponent } from './skill/skill-creation/skill-creation.component';
import { SkillListComponent } from './skill/skill-list/skill-list.component';
import { SkillRemoveComponent } from './skill/skill-remove/skill-remove.component';
import { SkillEditionComponent } from './skill/skill-edition/skill-edition.component';

const routes: Routes = [
  /**Area path */
  {
    path:'area-list',
    component:AreaListComponent
  },
  {
    path:'area-create',
    component:AreaCreationComponent
  },
  {
    path:'area-edition/:id',
    component:AreaEditionComponent
  },
  /**Category paht */
  {
    path:'category-creation',
    component:CategoryCreationComponent
  },
  {
    path:'category-remove',
    component:CategoryRemoveComponent
  },
  {
    path:'category-list',
    component:CategoryListComponent
  },
  {
    path:'category-edition',
    component:CategoryEditionComponent
  },
  
  /**publication-reques path */
  {
    path:'publication-request-creation',
    component:PublicationRequestCreationComponent
  },
  {
    path:'publication-request-list',
    component:PublicationRequestListComponent
  },
  {
    path:'publication-request-remove',
    component:PublicationRequestRemoveComponent
  },
  {
    path:'publication-request-edition',
    component:PublicationRequestEditionComponent
  },
  /**skills path*/
  {
    path:'skill-creation',
    component:SkillCreationComponent
  },
  {
    path:'skill-list',
    component:SkillListComponent
  },
  {
    path:'skill-remove',
    component:SkillRemoveComponent
  },
  {
    path:'skill-edition',
    component:SkillEditionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametersRoutingModule { }
