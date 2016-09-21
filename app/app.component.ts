import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
    <nav>
      <div>
        <a routerLink="designer" routerLinkActive="active">Designer</a>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      </div>
    </nav>
    <router-outlet></router-outlet>
    </div>
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