import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { ServiceConfig } from '../config/service-config';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticatedGuard implements CanActivate {
  constructor(
    private secSecurity: SecurityService,
    private router : Router
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.secSecurity.sessionExist() &&  this.secSecurity.getRolInSession(ServiceConfig.ADMIN_ROL)){
        return true;
      }else{
        this.router.navigate(["/home"])
        return false;
      }
  }
  
}
