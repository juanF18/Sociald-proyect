import { Component, OnInit } from '@angular/core';
 declare const initDropDown: any;

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(initDropDown(), 1000);
  }

}
