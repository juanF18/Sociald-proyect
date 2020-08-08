import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceConfig } from '../config/service-config';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  userData = new BehaviorSubject<UserModel>(new UserModel);

  constructor(
    private http: HttpClient,
    ) {
      this.verifyCurrentSession()
    }


    verifyCurrentSession(){
      let currentSession = this.getSessionData();
      if (currentSession){
        this.setUserData(JSON.parse(currentSession));
      }
    }
/**
 * 
 * @param user 
 */
  setUserData(user: UserModel){
    this.userData.next(user);
  }

  getUserData(){
    return this.userData.asObservable();
  }
  /**
   * Metodo para llamar el post de person que esta en el backend
   * @param person 
   */
  PersonLogin(user: UserModel):Observable<any> {
    return this.http.post<any>(`${ServiceConfig.BASE_URL}login`, user, {
      headers: new HttpHeaders({

      }),
    });
  }
  /**
   * save user data
   * @param session user data and tokern
   */
  saveSessionData(session: any): boolean{
    let currentSession = localStorage.getItem('session');
    if (currentSession){
      return false;
    }else{
      let data: UserModel = {
        token: session.token,
        isLogged: true
      };
      localStorage.setItem('session', JSON.stringify(data));
      this.setUserData(data);
      return true
    }
  }

  /**
   * return curren session
   */
  getSessionData(){
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }

  /**
   * clear session data
   */
  logout(){
    localStorage.removeItem('session');
    this.setUserData(new UserModel())
  }

  getToken():String{
    let currentSession = JSON.parse(this.getSessionData());
    return currentSession.token;
  }
}
