import { NgModule, Injectable}       from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig }  from '@angular/platform-browser';
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

//temporary workaround for Material because Hammer.js currently ovverides the native Drag Start & DragENd
@Injectable()
export class AppGestureConfig extends HammerGestureConfig { }

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
      MdIconRegistry,
    { provide: HAMMER_GESTURE_CONFIG, useClass: AppGestureConfig }
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