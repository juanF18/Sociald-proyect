import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cloud } from "../../config/cloudinary-config";

@Injectable({
  providedIn: 'root',
})
export class CloudImgService {
  currentData: any;
  public_id: string = '';

  constructor(
    private http: HttpClient
  ) {
    this.currentData = {}
  }

  dataFromImg(data: any){
    if (data) {
      this.currentData = data;
      this.public_id = this.currentData.public_id
      
    }else{
      console.log('No se cargo ninguna dada ');
    }
  }
  getPublicId(){
    console.log(this.public_id);
    return this.public_id
  }

  setPublicId(id:string){
    this.public_id = id
  }
}
