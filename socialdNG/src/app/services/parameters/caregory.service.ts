import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SecurityService } from '../security.service';
import { Observable } from 'rxjs';
import { ServiceConfig } from 'src/app/config/service-config';
import { CategoryModel } from "../../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CaregoryService {
  entity = 'category';
  token : String = '';

  constructor(
    private http: HttpClient,
    private security: SecurityService,

  ) {
    this.token = security.getToken()
  }

  /**
   * Obtener todas las areas que estan en la base de datos
   */
  getAllRecords(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(
      `${ServiceConfig.BASE_URL}${this.entity}?filter=%7B%0A%20%20%22include%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22relation%22%3A%20%22area%22%0A%20%20%20%20%7D%0A%20%20%5D%0A%7D`
    );
  }

  getRecordById(id: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(
      `${ServiceConfig.BASE_URL}${this.entity}/${id}`
    );
  }
  /**
   * Agrega una nueva area
   * @param record un area con todos los atributos
   */
  saveNewRecord(record: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(
      `${ServiceConfig.BASE_URL}${this.entity}`,
      record,
      {
        headers: new HttpHeaders({
          Authorizacion: `Bearer ${this.token}`,
        }),
      }
    );
  }
  /**
   * edita el area que nosotros queramos
   * @param record
   */
  editRecord(record: CategoryModel): Observable<CategoryModel> {
    return this.http.patch<CategoryModel>(
      `${ServiceConfig.BASE_URL}${this.entity}/${record.id}`,
      record,
      {
        headers: new HttpHeaders({
          Authorizacion: `Bearer ${this.token}`,
        }),
      }
    );
  }

  deleteRecord(recordId: string): Observable<any> {
    return this.http.delete(
      `${ServiceConfig.BASE_URL}${this.entity}/${recordId}`,
      {
        headers: new HttpHeaders({
          Authorizacion: `Bearer ${this.token}`,
        }),
      }
    );
  }
}
