import { Component, OnInit } from '@angular/core';
import { PublicationService } from '../../../services/publication.service';
import { PublicationModel } from 'src/app/models/publication.model';
declare const showMessage: any;
declare const showRemoveConfirmation: any;
declare const closeModal:any;

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {
  p: number;
  recordList: PublicationModel[];
  idToRemove: string;

  constructor(
    private publicationService: PublicationService
  ) {
    this.p = 1;
  }

  ngOnInit(): void {
    this.publicationService.getAllMyPublications()
      .subscribe(res => {
        this.recordList = res;
      })
  }

  removeConfirmation(id) {
    this.idToRemove = id;
    showRemoveConfirmation();
  }

  deleteRecord() {
    // if (this.idToRemove){
    //   this.service.deleteRecord(this.idToRemove).subscribe(
    //     (data) => {
    //       this.idToRemove = '';
    //       showMessage('Record removed successfuly');
    //       closeModal('removeCofirmation')
    //       this.fillsRecords()
    //     },
    //     (error) => {
    //       showMessage('error en al comunicacion del backend');
    //     }
    //   );
    // }
  }

}
