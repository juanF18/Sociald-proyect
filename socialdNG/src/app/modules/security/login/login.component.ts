import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { SecurityService } from '../../../services/security.service';


declare const showMessage: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fgValidator: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  LoginRegisterFN() {
    if (this.fgValidator.invalid) {
      showMessage('Formulario invalido');
    } else {
      //showMessage('Registrando')
      let model = this.getLoginData();
      this.service.PersonLogin(model).subscribe(
        (data) => {
          this.service.saveSessionData(data);
          this.router.navigate(['/home']);
        },
        (error) => {
          showMessage('Datos Invalidos.');
        }
      );
    }
  }

  getLoginData(): UserModel {
    let model = new UserModel();
    model.email = this.fgv.email.value;
    model.password = this.fgv.password.value;
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
