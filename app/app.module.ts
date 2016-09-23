import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

// Imports for loading & configuring the in-memory web api
import { HttpModule, XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './in-memory-data.service';

import { AppComponent }   from './app.component';
import { routing }        from './app.routing';

import { HeroesComponent }      from './heroes.component';
import { DashboardComponent }   from './dashboard.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { DesignerComponent }  from './designer.component';
import { DesignerToolsComponent }  from './designer-tools.component';
import { DesignerStageComponent }  from './designer-stage.component';
import { DesignerDroppable }  from './designer-droppable.directive';
import { DesignerDraggable }  from './designer-draggable.directive';
import { Widget } from './widget.component';
import { TextWidget } from './text-widget.component';
import { ImageWidget } from './image-widget.component';
import { DesignerGlobalsService } from './designer-globals.service';

import { HeroService }  from './hero.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    HeroDetailComponent,
    DesignerComponent,
    DesignerToolsComponent,
    DesignerStageComponent,
    DesignerDraggable, DesignerDroppable, 
    TextWidget, Widget,
    ImageWidget
  ],
  providers: [
    DesignerGlobalsService,
    HeroService,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA,  useClass: InMemoryDataService }     // in-mem server data
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