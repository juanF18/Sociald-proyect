import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AreaModel } from '../../models/area.model';
import { ServiceConfig } from 'src/app/config/service-config';
import { SecurityService } from '../security.service';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  entity = 'area';
  token: String = '';
  constructor(private http: HttpClient, private security: SecurityService) {
    this.token = security.getToken();
  }
  /**
   * Obtener todas las areas que estan en la base de datos
   */
  getAllRecords(): Observable<AreaModel[]> {
    return this.http.get<AreaModel[]>(
      `${ServiceConfig.BASE_URL}${this.entity}`
    );
  }

  getRecordById(id: string): Observable<AreaModel> {
    return this.http.get<AreaModel>(
      `${ServiceConfig.BASE_URL}${this.entity}/${id}`
    );
  }
  /**
   * Agrega una nueva area
   * @param record un area con todos los atributos
   */
  saveNewRecord(record: AreaModel): Observable<AreaModel> {
    return this.http.post<AreaModel>(
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
  editRecord(record: AreaModel): Observable<AreaModel> {
    return this.http.patch<AreaModel>(
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
