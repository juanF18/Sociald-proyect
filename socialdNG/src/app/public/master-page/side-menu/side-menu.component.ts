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

  constructor(private service: SecurityService) {}

  ngOnInit(): void {
    this.subscription = this.service.getUserData().subscribe((data) => {
      this.isLogged = data.isLogged;
    });
  }
}
