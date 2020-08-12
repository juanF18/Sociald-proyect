import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicationService } from 'src/app/services/publication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicationModel } from 'src/app/models/publication.model';
import { PublicationRequestModel } from 'src/app/models/publication-request.model';

@Component({
  selector: 'app-publication-edition',
  templateUrl: './publication-edition.component.html',
  styleUrls: ['./publication-edition.component.css']
})
export class PublicationEditionComponent implements OnInit {
  publicationId: string;
  currentUser: any;
  fgValidator: FormGroup;
  publication: PublicationModel;

  constructor(
    private fb: FormBuilder,
    private publicationService: PublicationService,
    private router: Router,
    private currentRoute: ActivatedRoute,
  ) {
    this.publicationId = this.currentRoute.snapshot.params['id'];
    this.currentUser = this.publicationService.currentUser;
  }

  ngOnInit(): void {
    this.initForm();
    this.getRecordData();
  }

  initForm(){
    this.fgValidator = this.fb.group({
      message: ['', [Validators.required]]
    })
  }

  getRecordData() {
    this.publicationService.getPublicationById(this.publicationId).subscribe(pub => {
      this.publication = pub;
    })
  }

  getFormData(): PublicationRequestModel {
    let newPublicationRequest = new PublicationRequestModel();

    newPublicationRequest.message = this.fgv.message.value;
    newPublicationRequest.companyId = this.currentUser.data.id;
    newPublicationRequest.publicationId = this.publication.id;

    return newPublicationRequest;
  }

  get fgv() {
    return this.fgValidator.controls;
  }

  contractPublication() {
    if(!this.fgValidator.invalid) {

      this.publicationService.postPublicationRequest(this.getFormData())
        .subscribe(res => {
          console.log(res);
          this.router.navigate(['/publication'])
        })
    }else{
      console.error("Llena el puto formulario");

    }
  }

}
