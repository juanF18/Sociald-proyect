import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from 'src/app/config/forms-config';
import { AreaService } from 'src/app/services/parameters/area.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaModel } from 'src/app/models/area.model';
declare const showMessage: any;
@Component({
  selector: 'app-area-edition',
  templateUrl: './area-edition.component.html',
  styleUrls: ['./area-edition.component.css'],
})
export class AreaEditionComponent implements OnInit {
  fgValidator: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  id: string;

  constructor(
    private fb: FormBuilder,
    private service: AreaService,
    private router: Router,
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
          this.fgv.description.setValue(data.description);
        },
        (error) => {
          showMessage('Record not found');
          this.router.navigate(['/parameters/area-list']);
        }
      );
    } else {
      this.router.navigate(['parameters/area-list']);
    }
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      id: ['', [Validators.required]],
      name: [
        '',
        [Validators.required, Validators.minLength(this.nameMinLength)],
      ],
      description: ['', [Validators.required]],
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
          showMessage('Area update successfuly');
          this.router.navigate(['/parameters/area-list']);
        },
        (error) => {
          showMessage('Error al guardar.');
        }
      );
    }
  }

  getAreaData(): AreaModel {
    let model = new AreaModel();
    model.id = this.fgv.id.value;
    model.name = this.fgv.name.value;
    model.description = this.fgv.description.value;
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
