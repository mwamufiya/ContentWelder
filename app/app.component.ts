import { Component } from '@angular/core';

import 'jquery';
import 'jqueryui';
import 'semantic';

@Component({
  selector: 'my-app',
  templateUrl: `app/app.component.html`,
  styleUrls: ['app/app.component.css'],
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
        title:`image-chooser`,
        icon:`image`,
        url:`image-chooser`
      }
    ];
    return menuArr;
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/