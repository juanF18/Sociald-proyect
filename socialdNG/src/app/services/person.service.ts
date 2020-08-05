import { Injectable } from '@angular/core';
import { PersonModel } from '../models/person.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServiceConfig } from '../config/service-config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PersonService {
  entity = 'person';

  constructor(private http: HttpClient) {}

  /**
   * Metodo para llamar el post de person que esta en el backend
   * @param person 
   */
  PersonRegistering(person: PersonModel):Observable<PersonModel> {
    return this.http.post<PersonModel>(`${ServiceConfig.BASE_URL}${this.entity}`, person, {
      headers: new HttpHeaders({

      }),
    });
  }
}
