import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyModule } from '../modules/company/company.module';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../config/service-config';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  entity = 'company';

  constructor(private http: HttpClient) { }

  CompanyRegistering(company: CompanyModule):Observable<CompanyModule>{
    return this.http.post<CompanyModule>(`${ServiceConfig.BASE_URL}${this.entity}`, company,{
      headers: new HttpHeaders({
        
      })
    })
  }
}
