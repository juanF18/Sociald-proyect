import { Component, OnInit, NgZone, Input } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig as fconfig } from '../../../config/forms-config';
import { PersonService } from '../../../services/person.service';
import { PersonModel } from 'src/app/models/person.model';
import { CloudImgService } from "../../../services/cloud-service/cloud-img.service";
declare const showMessage: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fgValidator: FormGroup;
  profile_pic : string = '';
  codeMinLength = fconfig.CODE_MIN_LENGTH;
  nameMinLength = fconfig.NAME_MIN_LENGTH;
  lastnameMinLength = fconfig.LASTNAME_MIN_LENGTH;
  phoneMinLength = fconfig.PHONE_MIN_LENGTH;
  phoneMaxLength = fconfig.PHONE_MAX_LENGTH;
  passwordMinLength = fconfig.PASSWORD_MIN_LENGTH;

  constructor(
    private fb: FormBuilder,
    private service: PersonService,
    private router: Router,
    private serviceImg: CloudImgService
    
  ) { }

  ngOnInit(): void {
    this.FormBuilding();
    if(this.serviceImg.public_id){
      this.fgv.profilePicPath.setValue(this.serviceImg.getPublicId())
      this.profile_pic = this.serviceImg.getPublicId()
    }
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastname: ['',[Validators.required, Validators.minLength(this.lastnameMinLength)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(this.phoneMinLength), Validators.maxLength(this.phoneMaxLength)]],
      password:['',[Validators.required, Validators.minLength(this.passwordMinLength)],],
      profilePicPath:['']
    });
  }

  PersonRegisterFN() {
    if (this.fgValidator.invalid) {
      showMessage('Formulario invalido');
    } else {
      //showMessage('Registrando')
      let model = this.getPersonData();
      this.service.PersonRegistering(model).subscribe(
        (data) => {
          showMessage(
            'Registro guardado con exito, su contraseña esta en el correo.'
          );
          this.profile_pic = ''
          this.router.navigate(['/security/login']);
        },
        (error) => {
          showMessage('Error al registrar.');
          
        }
      );
    }
  }

  getPersonData(): PersonModel {
    let model = new PersonModel();
    model.code = this.fgv.code.value;
    model.name = this.fgv.name.value;
    model.lastname = this.fgv.lastname.value;
    model.email = this.fgv.email.value;
    model.phone = this.fgv.phone.value;
    model.password = this.fgv.password.value;
    model.profilePicPath = this.fgv.profilePicPath.value;
    return model;
  }


  get fgv() {
    return this.fgValidator.controls;
  }
}
