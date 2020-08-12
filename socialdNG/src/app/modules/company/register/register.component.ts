import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsConfig as fconfig } from 'src/app/config/forms-config';
import { CompanyService } from "../../../services/company.service";
import { CompanyModel } from "../../../models/company.model";
import { CloudImgService } from "../../../services/cloud-service/cloud-img.service";

declare const showMessage: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profile_pic : string = '';
  fgValidator: FormGroup;
  codeMinLength = fconfig.CODE_MIN_LENGTH;
  nameMinLength = fconfig.NAME_MIN_LENGTH;
  passwordMinLength = fconfig.PASSWORD_MIN_LENGTH;
  adressMinLength = fconfig.ADRESS_MIN_LENGTH;
  postalCodeMinLength = fconfig.POSTALCOD_MIN_LENGTH;
  phoneMinLength = fconfig.PHONE_MIN_LENGTH;
  phoneMaxLength = fconfig.PHONE_MAX_LENGTH;
  constructor(
    private fb:FormBuilder,
    private service: CompanyService,
    private router: Router,
    private serviceImg: CloudImgService
  ) { }

  ngOnInit(): void {
    this.FormBuilding()
    this.fgv.profilePicPath.setValue(this.serviceImg.getPublicId())
  }
  FormBuilding() {
    this.fgValidator = this.fb.group({
      nit: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.minLength(this.phoneMinLength), Validators.maxLength(this.phoneMaxLength)]],
      adress:['',[Validators.required, Validators.minLength(this.adressMinLength)]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]],
      postalCode:['',[ Validators.minLength(this.postalCodeMinLength)]],
      profilePicPath:['']
    });
  }

  CompanyRegisterFN() {
    if (this.fgValidator.invalid) {
      showMessage('Formulario invalido')
    }else{
      //showMessage('Registrando')
      let model = this.getCompanyData();
      this.service.CompanyRegistering(model).subscribe(
        data =>{
          showMessage("Registro guardado con exito, su contraseña esta en el correo.")
          this.router.navigate(['/security/login'])
      },
      error =>{
        showMessage("Error al registrar.")
      });
    } 
  }

  getCompanyData(): CompanyModel{
    let model = new CompanyModel();
    model.nit = this.fgv.code.value;
    model.name= this.fgv.name.value;
    model.email = this.fgv.email.value;
    model.adress = this.fgv.adress.value;
    model.password = this.fgv.password.value;
    model.profilePicPath = this.fgv.profilePicPath.value;
    return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }
}
