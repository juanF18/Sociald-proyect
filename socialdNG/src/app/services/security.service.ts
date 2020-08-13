import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceConfig } from '../config/service-config';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { UserModel } from '../models/user.model';
import { PasswordResetModel } from "../models/pasReset.mode";
import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  userData = new BehaviorSubject<UserModel>(new UserModel());
  SECRET_KEY = 'socialdjwts3cr3t';
  name: String = '';

  constructor(private http: HttpClient) {
    this.verifyCurrentSession();
  }

  verifyCurrentSession() {
    let currentSession = this.getSessionData();
    if (currentSession) {
      this.setUserData(JSON.parse(currentSession));
    }
  }
  /**
   *
   * @param user
   */
  setUserData(user: UserModel) {
    this.userData.next(user);
  }

  getUserData() {
    return this.userData.asObservable();
  }
  /**
   * Metodo para llamar el post de person que esta en el backend
   * @param person
   */
  PersonLogin(user: UserModel): Observable<any> {
    return this.http.post<any>(`${ServiceConfig.BASE_URL}login`, user, {
      headers: new HttpHeaders({}),
    });
  }

  PasswordReset(data: PasswordResetModel):Observable<any>{
    return this.http.post<any>(`${ServiceConfig.BASE_URL}password-reset`, data, {
      headers: new HttpHeaders({})
    })
  }

  /**
   * save user data
   * @param session only save token
   */
  saveSessionData(session: any): boolean {
    let currentSession = localStorage.getItem('session');
    if (currentSession) {
      return false;
    } else {
      let data: UserModel = {
        token: session.token,
        isLogged: true,
      };
      localStorage.setItem('session', JSON.stringify(data));
      this.setUserData(data);
      return true;
    }
  }

  /**
   * return curren session
   */
  getSessionData() {
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }

  sessionExist(): boolean {
    let currentSession = this.getSessionData();
    return currentSession ? true : false;
  }

  getRolInSession(roleId): boolean {
    let currentSession = this.getSessionData();
    let dataSession = this.getDataToken(currentSession);
    return dataSession.role == roleId;
  }

  /**
   * clear session data
   */
  logout() {
    localStorage.removeItem('session');
    this.setUserData(new UserModel());
  }

  getToken(): String {
    let currentSession = JSON.parse(this.getSessionData());
    return currentSession.token;
  }

  getDataToken(token: string): any {
    let newData = JWT(token);
    return newData;
  }
}
