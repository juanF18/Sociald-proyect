import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './public/home/default/default.component';
import { AdminAuthenticatedGuard } from "../app/guards/admin-authenticated.guard";

const routes: Routes = [
  {
    path:'home',
    component: DefaultComponent
  },
  {
    path:'security',
    loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule)
  },
  {
    path:'parameters',
    loadChildren: () => import('./modules/parameters/parameters.module').then(m => m.ParametersModule),
    canActivate: [AdminAuthenticatedGuard]
  },
  {
    path:'publication',
    loadChildren: () => import('./modules/publication/publication.module').then(m => m.PublicationModule)
  },
  {
    path:'person',
    loadChildren: () => import('./modules/person/person.module').then(m => m.PersonModule)
  },
  {
    path:'company',
    loadChildren: () => import('./modules/company/company.module').then(m => m.CompanyModule)
  },
  {
    path:'upload-pics',
    loadChildren: () => import('./modules/upload-pics/upload-pics.module').then(m => m.UploadPicsModule)
  },
  {
    path:'**',
    redirectTo:'/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
