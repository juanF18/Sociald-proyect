import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { CaregoryService } from "../../../../services/parameters/caregory.service";
import { Router } from '@angular/router';
declare const showMessage: any;
declare const showRemoveConfirmation: any;
declare const closeModal:any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  p: number = 1;
  recordList: CategoryModel[];
  idToRemove: string = '';

  constructor(
    private service: CaregoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fillsRecords();
  }

  fillsRecords() {
    this.service.getAllRecords().subscribe(
      (data) => {
        this.recordList = data;
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



