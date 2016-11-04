import { Component } from '@angular/core';
import { } from 'jquery';
import 'jqueryui';
import 'hammerjs';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `app.component.html`,
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  menuItems:Array<any>;
  constructor(){
    this.menuItems = this.getMenu();
  }
  getMenu():Array<any>{
    //TODO: this should be obtained from a service
    let menuArr = [
      {
        title:`designer`,
        icon:`paint brush`,
        url:`designer`
      },
      {
        title:`forms`,
        icon:`paint brush`,
        url:`forms`
      },
      {
        title: "Data View",
        icon: "grid layout icon",
        url: "dataviewwidget"
      }
    ];
    return menuArr;
  }
}