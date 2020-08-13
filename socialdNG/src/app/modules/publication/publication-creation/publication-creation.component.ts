import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicationService } from 'src/app/services/publication.service';
import { CaregoryService } from 'src/app/services/parameters/caregory.service';
import { Router } from '@angular/router';
import { PublicationModel } from 'src/app/models/publication.model';
import { CloudImgService } from "../../../services/cloud-service/cloud-img.service";
declare const showMessage:any

@Component({
  selector: 'app-publication-creation',
  templateUrl: './publication-creation.component.html',
  styleUrls: ['./publication-creation.component.css']
})
export class PublicationCreationComponent implements OnInit {

  fgValidator: FormGroup;
  categoryIds: CategoryModel[];

  constructor(
    private fb: FormBuilder,
    private publicationService: PublicationService,
    private categoryService: CaregoryService,
    private router: Router,
    private serviceImg: CloudImgService
  ) { }

  ngOnInit(): void {
    this.FormsBuilding()
    this.fgv.publicationPicPath.setValue(this.serviceImg.getPublicId())
    this.categoryService.getAllRecords().subscribe(res => this.categoryIds = res);

  }

  FormsBuilding(){
    this.fgValidator = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      publicationPicPath:['']
    });
  }

  saveNewRecordfn() {
    if (this.fgValidator.invalid) {
      showMessage('Formulario invalido')
    }else{
      let model = this.getPublicationData();

      this.publicationService.postPublication(model)
      .subscribe(
        res =>{
          console.log(res);

          showMessage("Post created!")
          this.router.navigate(['/publication'])
      },
      () =>{
        showMessage("Error al guardar el post.")
      });
    }
  }

  getPublicationData(): PublicationModel{
    let model = new PublicationModel();
    model.name = this.fgv.name.value;
    model.description = this.fgv.description.value;
    model.categoryId = this.fgv.categoryId.value;
    model.publicationPicPath = this.fgv.publicationPicPath.value
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }

}
