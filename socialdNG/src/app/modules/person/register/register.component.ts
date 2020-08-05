import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare const showMessage: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fgValidator: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(7)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.minLength(12), Validators.maxLength(15),]],
      password: ['', [Validators.required, Validators.minLength(12)]],
      
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
