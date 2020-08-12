import { Component, OnInit, Input, NgZone } from '@angular/core';
import {
  FileUploader,
  ParsedResponseHeaders,
  FileUploaderOptions,
  FileSelectDirective
} from 'ng2-file-upload';
import { Location } from "@angular/common";
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';
import { cloud } from '../../../config/cloudinary-config';
import { FormBuilder } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CloudImgService } from "../../../services/cloud-service/cloud-img.service";
declare const showMessage:any
declare const showRemoveImgConfirmation:any
declare const closeModal:any

@Component({
  selector: 'app-cloud-img',
  templateUrl: './cloud-img.component.html',
  styleUrls: ['./cloud-img.component.css'],
})
export class CloudImgComponent implements OnInit {
  img_id: string;
  @Input()
  responses: Array<any>;

  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader;
  public title: string;

  constructor(
    public cloudinary: Cloudinary,
    public zone: NgZone,
    public http: HttpClient,
    public fb: FormBuilder,
    public service: CloudImgService,
    private location: Location
  ) {
    this.responses = [];
    this.title = '';
    this.img_id = '';
  }

  ngOnInit(): void {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${cloud.CLOUD_NAME}/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest',
        },
      ],
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', cloud.UPLOAD_PRESET);
      let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `socialDProyect,${this.title}`;
      }
      form.append('folder', 'SocialD-Folder');
      form.append('tags', tags);
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = (fileItem) => {
      this.zone.run(() => {
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          this.responses[existingId] = Object.assign(
            this.responses[existingId],
            fileItem
          );
        } else {
          this.responses.push(fileItem);
        }
      });
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) => {
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });

      this.uploader.onProgressItem = (fileItem: any, progress: any) =>
        upsertResponse({
          file: fileItem.file,
          progress,
          data: {},
        });
      this.service.dataFromImg(JSON.parse(response))
      showMessage('the img was uploaded successfully')
      this.setImgId(this.service.getPublicId())
    };
  }

  updateTitle(value: string) {
    this.title = value;
  }

  setImgId(id:string){
    this.img_id = id 
  }

  deleteImage = function (data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${cloud.CLOUD_NAME}/delete_by_token`;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    });
    const options = { headers: headers };
    const body = {
      token: data.delete_token,
    };
    this.http.post(url, body, options).subscribe((response) => {
      console.log(`Deleted image - ${data.public_id} ${response.result}`);
      this.responses.splice(index, 1);
    });
    
    this.service.setPublicId('')
    this.setImgId(this.service.getPublicId())
  };

  showConfirmRemove(){
    showRemoveImgConfirmation()
  }

  goBack(){
    this.location.back()
  }

  closeImgModa(){
    closeModal('removeImgCofirmation')
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties).map((key) => ({
      key: key,
      value: fileProperties[key],
    }));
  }
}
