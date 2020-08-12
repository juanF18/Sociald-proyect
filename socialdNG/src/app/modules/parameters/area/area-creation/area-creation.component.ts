import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from 'src/app/config/forms-config';
import { AreaService } from 'src/app/services/parameters/area.service';
import { Router } from '@angular/router';
import { AreaModel } from 'src/app/models/area.model';
declare const showMessage:any;

@Component({
  selector: 'app-area-creation',
  templateUrl: './area-creation.component.html',
  styleUrls: ['./area-creation.component.css']
})
export class AreaCreationComponent implements OnInit {

  fgValidator: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;

  constructor(
    private fb: FormBuilder,
    private service: AreaService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      description: ['', [Validators.required]]
    });
  }

  saveNewRecordfn() {
    if (this.fgValidator.invalid) {
      showMessage('Formulario invalido')
    }else{
      //showMessage('Registrando')
      let model = this.getAreaData();
      this.service.saveNewRecord(model).subscribe(
        data =>{
          showMessage("Nueva area guardada")
          this.router.navigate(['/parameters/area-list'])
      },
      error =>{
        showMessage("Error al guardar.")
      });
    }
  }

  getAreaData(): AreaModel{
    let model = new AreaModel();

    model.name = this.fgv.name.value;
    model.description = this.fgv.description.value;

    return model;
  }


  get fgv() {
    return this.fgValidator.controls;
  }
}
