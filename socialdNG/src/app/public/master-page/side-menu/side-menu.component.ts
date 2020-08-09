import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  isLogged: Boolean = false;
  email: String = '';
  role: String = 'person';

  subscription: Subscription;

  constructor(private service: SecurityService) {
  }
  
  ngOnInit(): void {
    let sessionData = this.service.getSessionData();
    this.subscription = this.service.getUserData().subscribe((data) => {
      this.isLogged = data.isLogged;
      let tokenData = this.service.getDataToken(sessionData);
      this.role = tokenData.role;
      this.email = tokenData.email;
      
    });
  }
}
