import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceConfig } from '../config/service-config';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) {}

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
}
