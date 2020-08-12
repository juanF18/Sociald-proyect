import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicationModel } from '../models/publication.model';
import { ServiceConfig } from 'src/app/config/service-config';
import { SecurityService } from './security.service';
import { Observable } from 'rxjs';
import { PublicationRequestModel } from '../models/publication-request.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  entity: string = 'publication';
  token: string;
  currentUser: any;

  constructor(
    private http: HttpClient,
    private securityService: SecurityService,
  ) {
    this.token = String(this.securityService.getToken());
    this.currentUser = this.securityService.getDataToken(this.token);
  }

  getAllPublications(): Observable<PublicationModel[]> {
    return this.http.get<PublicationModel[]>(
      `${ServiceConfig.BASE_URL}publication?filter={ "include": [ { "relation": "category" }, { "relation": "person" } ] }`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    )
  }

  getPublicationById(id: string): Observable<PublicationModel> {
    return this.http.get<PublicationModel>(
      `${ServiceConfig.BASE_URL}publication/${id}?filter={ "include": [ { "relation": "category" }, { "relation": "person" } ] }`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    )
  }

  getAllMyPublications(): Observable<PublicationModel[]> {
    return this.http.get<PublicationModel[]>(
      `${ServiceConfig.BASE_URL}people/${this.currentUser.data.id}/publications?filter={ "include": [ { "relation": "category" } ] }`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    )
  }

  postPublication(newPublication: PublicationModel): Observable<PublicationModel> {
    return this.http.post<PublicationModel>(
      `${ServiceConfig.BASE_URL}people/${this.currentUser.data.id}/publications`,
      newPublication,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }

  postPublicationRequest(newPR: PublicationRequestModel): Observable<PublicationRequestModel> {
    return this.http.post<PublicationRequestModel>(
      `${ServiceConfig.BASE_URL}publication-request`,
      newPR,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      }
    );
  }
}
