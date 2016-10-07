import { Component } from '@angular/core';

import 'jquery';
import 'jqueryui';
import 'semantic';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
    <nav>
      <div>
        <a routerLink="designer" routerLinkActive="active">Designer</a>
      </div>
    </nav>
    <router-outlet></router-outlet>
    </div>
    <span class="com"></span>
  `,
  styleUrls: ['app/app.component.css'],
})
export class AppComponent {
  
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/