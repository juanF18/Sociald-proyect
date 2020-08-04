import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { CategoryCreationComponent } from './category/category-creation/category-creation.component';
import { CategoryEditionComponent } from './category/category-edition/category-edition.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryRemoveComponent } from './category/category-remove/category-remove.component';
import { AreaCreationComponent } from './area/area-creation/area-creation.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { AreaEditionComponent } from './area/area-edition/area-edition.component';
import { SkillCreationComponent } from './skill/skill-creation/skill-creation.component';
import { SkillListComponent } from './skill/skill-list/skill-list.component';
import { SkillRemoveComponent } from './skill/skill-remove/skill-remove.component';
import { SkillEditionComponent } from './skill/skill-edition/skill-edition.component';
import { PublicationRequestCreationComponent } from './publication-request/publication-request-creation/publication-request-creation.component';
import { PublicationRequestRemoveComponent } from './publication-request/publication-request-remove/publication-request-remove.component';
import { PublicationRequestListComponent } from './publication-request/publication-request-list/publication-request-list.component';
import { PublicationRequestEditionComponent } from './publication-request/publication-request-edition/publication-request-edition.component';


@NgModule({
  declarations: [CategoryCreationComponent, CategoryEditionComponent, CategoryListComponent, CategoryRemoveComponent, AreaCreationComponent, AreaListComponent, AreaEditionComponent, SkillCreationComponent, SkillListComponent, SkillRemoveComponent, SkillEditionComponent, PublicationRequestCreationComponent, PublicationRequestRemoveComponent, PublicationRequestListComponent, PublicationRequestEditionComponent],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
