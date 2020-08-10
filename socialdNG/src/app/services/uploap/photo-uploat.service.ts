import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cloudinary } from "@cloudinary/angular-5.x";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoUploatService {

  constructor(
    private http: HttpClient,
    private cloudinary: Cloudinary
  ) { }

}
