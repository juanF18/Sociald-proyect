import { Component, OnInit } from '@angular/core';
import { AreaModel } from '../../../../models/area.model';
import { AreaService } from '../../../../services/parameters/area.service';
import { Router } from '@angular/router';
declare const closeModal:any
declare const showMessage: any;
declare const showRemoveConfirmation: any;
@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css'],
})
export class AreaListComponent implements OnInit {
  recordList: AreaModel[];
  idToRemove: string = '';

  constructor(private service: AreaService, private router: Router) {}

  ngOnInit(): void {
    this.fillsRecords();
  }

  fillsRecords() {
    this.service.getAllRecords().subscribe(
      (data) => {
        this.recordList = data;
        //console.log(this.recordList);
      },
      (error) => {
        showMessage('error en al comunicacion del backend');
      }
    );
  }

  RemoveConfirmation(id) {
    this.idToRemove = id;
    showRemoveConfirmation();
  }

  deleteRecord() {
    if (this.idToRemove){
      this.service.deleteRecord(this.idToRemove).subscribe(
        (data) => {
          this.idToRemove = '';
          showMessage('Record removed successfuly');
          closeModal('removeCofirmation')
          this.fillsRecords()
        },
        (error) => {
          showMessage('error en al comunicacion del backend');
        }
      );  
    }
  }
}
