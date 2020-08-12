import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from 'src/app/config/forms-config';
import { CaregoryService } from "../../../../services/parameters/caregory.service";
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
declare const showMessage:any;

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {
  fgValidator: FormGroup;
  nameMinLenth = FormsConfig.PARAM_NAME_MIN_LENGTH;
  id: string;

  constructor(
    private fb: FormBuilder,
    private service: CaregoryService,
    private router : Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.FormBuilding();
    this.getDataOfRecord();
  }

  getDataOfRecord() {
    if (this.id) {
      this.service.getRecordById(this.id).subscribe(
        (data) => {
          this.fgv.id.setValue(this.id);
          this.fgv.name.setValue(data.name);
        },
        (error) => {
          showMessage('Record not found');
          this.router.navigate(['/parameters/category-list']);
        }
      );
    } else {
      this.router.navigate(['parameters/category-list']);
    }
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      id: ['', [Validators.required]],
      name: [
        '',
        [Validators.required, Validators.minLength(this.nameMinLenth)],
      ]
    });
  }

  editRecordfn() {
    if (this.fgValidator.invalid) {
      showMessage('Formulario invalido');
    } else {
      //showMessage('Registrando')
      let model = this.getAreaData();
      this.service.editRecord(model).subscribe(
        (data) => {
          showMessage('Category update successfuly');
          this.router.navigate(['/parameters/category-list']);
        },
        (error) => {
          showMessage('Error al guardar.');
        }
      );
    }
  }

  getAreaData(): CategoryModel {
    let model = new CategoryModel();
    model.id = this.fgv.id.value;
    model.name = this.fgv.name.value;
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }

}
