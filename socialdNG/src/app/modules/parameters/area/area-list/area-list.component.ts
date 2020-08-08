import { Component, OnInit } from '@angular/core';
import { AreaModel } from '../../../../models/area.model';
import { AreaService } from '../../../../services/parameters/area.service';

declare const showMessage: any;
declare const showRemoveConfirmation: any;
declare const showNewRecordModal: any
@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css'],
})
export class AreaListComponent implements OnInit {
  recordList: AreaModel[];
  
  constructor(
    private service: AreaService
    ) {}

  ngOnInit(): void {
    this.fillsRecords()
  }

  fillsRecords(){
    this.service.getAllRecords().subscribe(
      (data) => {
        this.recordList = data;
        console.log(this.recordList);
      },
      (error) => {
        showMessage('error en al comunicacion del backend');
      }
    );
  }

  RemoveConfirmation(){
    showRemoveConfirmation()
  }

  addNewRecord(){
    showNewRecordModal()
  }
}
