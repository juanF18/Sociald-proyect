import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SecurityService } from "../../../services/security.service";
import { PasswordResetModel } from "../../../models/pasReset.mode";
import { Router } from '@angular/router';
declare const showMessage: any;

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  fgValidator: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.FormBuilding()
  }

  FormBuilding(){
    this.fgValidator = this.fb.group({
      email:['',[Validators.required]]
    })
  }

  passResetFN(){
    if(this.fgValidator.invalid){
      showMessage('Invalid Form')
    } else {
      let model = this.getPassData();
      this.service.PasswordReset(model).subscribe(
        data => {
          
          showMessage("Invalid data.")
        },
        error => {
          showMessage("Your password has been reset successfuly, please check your email inbox")
          this.router.navigate(['/home']);
        }
      )
    }
  }

  getPassData(): PasswordResetModel{
    let model = new PasswordResetModel();
    model.email = this.fgv.email.value;
    return model
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
