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
import { DesignerModule }    from './components/designer.module';
//import { Widget } from './components/widgets/widget.component';
//import { DesignerComponent }  from './components/designer.component';

//import { DesignerToolsMenu } from './components/designer-tools-menu.component';
//import { WidgetContainer } from './components/widgets/widget-container.component';
//import { ImageChooser } from './components/image/image-chooser.component';
//import { BorderSelection } from './components/border-selection.component';
//import { DesignerStageComponent }  from './components/designer-stage.component';
//import { BoxWidget } from './components/widgets/box.component';
//import { ImageWidget } from './components/widgets/image.component';
//import { VideoWidget } from './components/widgets/video.component';
//import { TextboxWidget } from './components/widgets/textbox.component';


/*************Directives***********/
//import { DesignerDroppable }  from './directives/designer-droppable.directive';
//import { DesignerDraggable }  from './directives/designer-draggable.directive';
//import { Resize }  from './directives/resize.directive';
//import { WidgetTemplateFactory } from './directives/widget-template-factory.directive';

/*************Services************* */
//import { DesignerGlobalsService } from './services/designer-globals.service';
//import { ImageService } from './services/image.service';
//import { VideoService } from './services/video.service';


@NgModule({
  imports: [
    NgSemanticModule,
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    ModalModule,
    DesignerModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/