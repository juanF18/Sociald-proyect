import { Component, OnInit, NgZone, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
} from '@angular/forms';
import { FormsConfig as fconfig } from '../../../config/forms-config';
import { PersonService } from '../../../services/person.service';
import { PersonModel } from 'src/app/models/person.model';
import { Router } from '@angular/router';
import {
  FileUploader,
  FileUploadModule,
  ParsedResponseHeaders,
  FileUploaderOptions,
  FileItem,
} from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cloud } from '../../../config/cloudinary-config';
import { formatCurrency } from '@angular/common';
import { expressionType } from '@angular/compiler/src/output/output_ast';
declare const showMessage: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fgValidator: FormGroup;
  codeMinLength = fconfig.CODE_MIN_LENGTH;
  nameMinLength = fconfig.NAME_MIN_LENGTH;
  lastnameMinLength = fconfig.LASTNAME_MIN_LENGTH;
  phoneMinLength = fconfig.PHONE_MIN_LENGTH;
  phoneMaxLength = fconfig.PHONE_MAX_LENGTH;
  passwordMinLength = fconfig.PASSWORD_MIN_LENGTH;

  @Input()
  responses: Array<any>;

  hasBaseDropZoneOver: boolean = false;
  uploader : FileUploader
  private title: string;
  constructor(
    private fb: FormBuilder,
    private service: PersonService,
    private router: Router,
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    
  ) {
    this.responses = [];
    this.title = '';
  }

  ngOnInit(): void {
    this.FormBuilding();
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
    this.uploader = new FileUploader(uploaderOptions)
    
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', cloud.UPLOAD_PRESET)
      let tags = 'SocialDAlbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `SocialDAlbum,${this.title}`;
      }
      form.append('folder', 'sociald_sample');
      form.append('tags', tags);
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    const upsertResponse = (fileItem) => {
      this.zone.run(() => {
        const exitingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (exitingId > 1) {
          this.responses[exitingId] = Object.assign(
            this.responses[exitingId],
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
      this.fgv.profilePicPath.setValue(JSON.parse(response).public_id);
      console.log(this.fgv);
      this.uploader.onProgressItem = (fileItem: any, progress: any) => {
        upsertResponse({
          file: fileItem.file,
          progress,
          data: {},
        });
      };
    };
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      code: [
        '',
        [Validators.required, Validators.minLength(this.codeMinLength)],
      ],
      name: [
        '',
        [Validators.required, Validators.minLength(this.nameMinLength)],
      ],
      lastname: [
        '',
        [Validators.required, Validators.minLength(this.lastnameMinLength)],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(this.phoneMinLength),
          Validators.maxLength(this.phoneMaxLength),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(this.passwordMinLength)],
      ],
      profilePicPath:['']
    });
  }

  PersonRegisterFN() {
    if (this.fgValidator.invalid) {
      showMessage('Formulario invalido');
    } else {
      //showMessage('Registrando')
      let model = this.getPersonData();
      this.service.PersonRegistering(model).subscribe(
        (data) => {
          showMessage(
            'Registro guardado con exito, su contraseña esta en el correo.'
          );
          this.router.navigate(['/security/login']);
        },
        (error) => {
          showMessage('Error al registrar.');
        }
      );
    }
  }

  getPersonData(): PersonModel {
    let model = new PersonModel();
    model.code = this.fgv.code.value;
    model.name = this.fgv.name.value;
    model.lastname = this.fgv.lastname.value;
    model.email = this.fgv.email.value;
    model.phone = this.fgv.phone.value;
    model.password = this.fgv.password.value;
    model.profilePicPath = this.fgv.profilePicPath.value;
    return model;
  }

  updateTitle(value: string) {
    this.title = value;
  }

  
  // deleteImage (data: any, index: number) {
  //   const url = `https://api.cloudinary.com/v1_1/${cloud.CLOUD_NAME}/delete_by_token`;
  //   const body = {
  //     token: data.delete_token
  //   };
  //   this.http.post(url, body, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'
  //     })
  //   }).subscribe(response => {
  //     console.log(`Deleted image - ${data.public_id} ${response}`);
  //     this.responses.splice(index, 1);
  //   });
  // };

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ 'key': key, 'value': fileProperties[key] }));
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
