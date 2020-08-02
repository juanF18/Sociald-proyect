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
import { PublicationCreateComponent } from './publication/publication-create/publication-create.component';
import { PublicationListComponent } from './publication/publication-list/publication-list.component';
import { PublicationRemoveComponent } from './publication/publication-remove/publication-remove.component';
import { PublicationEditionComponent } from './publication/publication-edition/publication-edition.component';
import { SkillCreationComponent } from './skill/skill-creation/skill-creation.component';
import { SkillListComponent } from './skill/skill-list/skill-list.component';
import { SkillRemoveComponent } from './skill/skill-remove/skill-remove.component';
import { SkillEditionComponent } from './skill/skill-edition/skill-edition.component';


@NgModule({
  declarations: [CategoryCreationComponent, CategoryEditionComponent, CategoryListComponent, CategoryRemoveComponent, AreaCreationComponent, AreaListComponent, AreaEditionComponent, PublicationCreateComponent, PublicationListComponent, PublicationRemoveComponent, PublicationEditionComponent, SkillCreationComponent, SkillListComponent, SkillRemoveComponent, SkillEditionComponent],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
