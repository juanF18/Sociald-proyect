import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from 'src/app/config/forms-config';
import { CaregoryService } from "../../../../services/parameters/caregory.service";
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
declare const showMessage:any

@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.css']
})
export class CategoryCreationComponent implements OnInit {

  fgValidator: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;

  constructor(
    private fb: FormBuilder,
    private service: CaregoryService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
    });
  }

  saveNewRecordfn() {
    if (this.fgValidator.invalid) {
      showMessage('Formulario invalido')
    }else{
      //showMessage('Registrando')
      let model = this.getCategoryData();
      this.service.saveNewRecord(model).subscribe(
        data =>{
          showMessage("Nueva area guardada")
          this.router.navigate(['/parameters/category-list'])
      },
      error =>{
        showMessage("Error al guardar.")
      });
    }
  }

  getCategoryData(): CategoryModel{
    let model = new CategoryModel();
    model.name = this.fgv.name.value;
    return model;
  }


  get fgv() {
    return this.fgValidator.controls;
  }
}
