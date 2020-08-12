import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CloudImgComponent } from "./cloud-img/cloud-img.component";

const routes: Routes = [
  {
    path:'upload-img',
    component: CloudImgComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPicsRoutingModule { }
