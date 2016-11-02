import { NgModule}       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';


// Imports for loading & configuring the in-memory web api
import { HttpModule, XHRBackend } from '@angular/http';

import { InMemoryBackendService } from 'angular-in-memory-web-api';
import { InMemoryDataService }    from './services/in-memory-data.service';

import { AppComponent }   from './app.component';
import { AppRoutingModule} from './app-routing.module'
//import { routing }        from './app.routing';

/**********Application Specific********************** */
/************Components************/
import { DesignerModule }    from './designer/designer.module';
import { MaterialModule, MdIconRegistry} from '@angular/material';
//import {AppRoutingModule}    from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    MaterialModule,
    DesignerModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
      MdIconRegistry
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/