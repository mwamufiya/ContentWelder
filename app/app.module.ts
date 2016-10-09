import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgSemanticModule } from 'ng-semantic';

// Imports for loading & configuring the in-memory web api
import { HttpModule, XHRBackend } from '@angular/http';

import { InMemoryBackendService } from 'angular-in-memory-web-api';
import { InMemoryDataService }    from './services/in-memory-data.service';

import { AppComponent }   from './app.component';
import { routing }        from './app.routing';

/**********Application Specific********************** */
/************Components************/
import { DesignerComponent }  from './components/designer.component';
import { DesignerToolsComponent }  from './components/designer-tools.component';
import { DesignerStageComponent }  from './components/designer-stage.component';
import { Widget } from './components/widget.component';
import { TextWidget } from './components/text-widget.component';
import { ImageWidget } from './components/image-widget.component';
import { VideoWidget } from './components/video-widget.component';
import { ResizeHandles } from './components/resizeHandles.component';
import { ImageChooser } from './components/image/image-chooser.component';
import { BorderSelection } from './components/border-selection.component';


/*************Directives***********/
import { DesignerDroppable }  from './directives/designer-droppable.directive';
import { DesignerDraggable }  from './directives/designer-draggable.directive';
import { Resize }  from './directives/resize.directive';
import { WidgetTemplateFactory } from './directives/widget-Template-factory.directive';

/*************Services************* */
import { DesignerGlobalsService } from './services/designer-globals.service';
import { ImageService } from './services/image.service';


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
    VideoWidget,
    Widget,
    ImageWidget,
    ImageChooser,
    BorderSelection
  ],
  providers: [
    DesignerGlobalsService,
    ImageService
  ],
  bootstrap: [ AppComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/