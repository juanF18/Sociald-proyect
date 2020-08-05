import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig as fconfig } from "../../../config/forms-config";
declare const showMessage: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fgValidator: FormGroup;
  codeMinLength = fconfig.CODE_MIN_LENGTH;
  nameMinLength = fconfig.NAME_MIN_LENGTH;
  lastnameMinLength = fconfig.LASTNAME_MIN_LENGTH;
  phoneMinLength = fconfig.PHONE_MIN_LENGTH;
  phoneMaxLength = fconfig.PHONE_MAX_LENGTH;
  passwordMinLength = fconfig.PASSWORD_MIN_LENGTH;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      lastname: ['', [Validators.required, Validators.minLength(this.lastnameMinLength)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.minLength(this.phoneMinLength), Validators.maxLength(this.phoneMaxLength),]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
    });
  }

  PersonRegisterFN() {
    if (this.fgValidator.invalid) {
      showMessage('Formulario invalido')
    }else{
      showMessage('Registrando')
      return false;
    }
    
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
