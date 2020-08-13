import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';
import { cloud } from "../../../config/cloudinary-config";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  isLogged: Boolean = false;
  email: String = '';
  role: String = 'person';
  public_id: string;
  name: String = ''
  cloudName: string;

  subscription: Subscription;

  constructor(private service: SecurityService) {
    this.cloudName = cloud.CLOUD_NAME
  }
  
  ngOnInit(): void {
    let sessionData = this.service.getSessionData();
    this.subscription = this.service.getUserData().subscribe((data) => {
      this.isLogged = data.isLogged;
      let tokenData = this.service.getDataToken(sessionData);
      this.role = tokenData.role;
      this.email = tokenData.email;
      this.name = tokenData.name
      setTimeout(()=>{
        this.public_id = tokenData.data.profilePicPath;
      }, 2000)
      console.log(tokenData);
      
      
      
    });
  }
}
