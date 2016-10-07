import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgSemanticModule } from 'ng-semantic';

// Imports for loading & configuring the in-memory web api
import { HttpModule, XHRBackend } from '@angular/http';

import { InMemoryBackendService } from 'angular-in-memory-web-api';
import { InMemoryDataService }               from './in-memory-data.service';

import { AppComponent }   from './app.component';
import { routing }        from './app.routing';

/**********Application Specific********************** */
import { DesignerComponent }  from './designer.component';
import { DesignerToolsComponent }  from './designer-tools.component';
import { DesignerStageComponent }  from './designer-stage.component';
import { DesignerDroppable }  from './designer-droppable.directive';
import { DesignerDraggable }  from './designer-draggable.directive';
import { Resize }  from './resize.directive';
import { Widget } from './widget.component';
import { TextWidget } from './text-widget.component';
import { ImageWidget } from './image-widget.component';
import { DesignerGlobalsService } from './designer-globals.service';
import { WidgetTemplateFactory } from './widget-Template-factory.directive';
import { ResizeHandles } from './resizeHandles.component';

@NgModule({
  imports: [
    NgSemanticModule,
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    ModalModule
  ],
  declarations: [
    AppComponent,
    DesignerComponent,
    DesignerToolsComponent,
    DesignerStageComponent,
    DesignerDraggable,
    DesignerDroppable,
    WidgetTemplateFactory,

    Resize,
    ResizeHandles,
    TextWidget,
    Widget,
    ImageWidget
  ],
  providers: [
    DesignerGlobalsService
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