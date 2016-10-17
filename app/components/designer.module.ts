import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

/**********Widget************** */
import { Widget } from './widgets/widget.component';
import { BoxWidget } from './widgets/box.component';
import { ImageWidget } from './widgets/image.component';
import { VideoWidget } from './widgets/video.component';
import { TextboxWidget } from './widgets/textbox.component';
import { PageWidget }  from './widgets/page.component';
import { DesignerToolsComponent }  from './designer-tools.component';
import { DesignerComponent }  from './designer.component';

/************3rd party*********** */
//import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgSemanticModule } from 'ng-semantic';
import {ColorPickerDirective, ColorPickerService} from 'angular2-color-picker';

/***********Helpers************ */

import { ResizeHandles } from './resizeHandles.component';
import { DesignerToolsMenu } from './designer-tools-menu.component';
import { ImageChooser } from './image/image-chooser.component';

/*************Directives***********/
import { DesignerDroppable }  from '../directives/designer-droppable.directive';
import { DesignerDraggable }  from '../directives/designer-draggable.directive';
import { Resize }  from '../directives/resize.directive';
import { WidgetTemplateFactory } from '../directives/widget-template-factory.directive';
import { BorderSelection } from './border-selection.component';

/*************Services************* */
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { ImageService } from '../services/image.service';
import { VideoService } from '../services/video.service';
import { FONTLIST } from '../services/fonts.service';

@NgModule({
  imports:[
    NgSemanticModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [ 
    DesignerComponent,
    Widget,
    PageWidget, 
    BoxWidget, 
    ImageWidget, 
    VideoWidget,
    TextboxWidget,
    ResizeHandles,
    DesignerDraggable,
    DesignerDroppable,
    Resize,
    BorderSelection,
    WidgetTemplateFactory,
    DesignerToolsMenu,
    ImageChooser,
    DesignerToolsComponent,
    ColorPickerDirective
  ],
  exports: [
    Widget,
    BoxWidget,
    ImageWidget,
    VideoWidget,
    TextboxWidget,
    PageWidget
  ],
  providers: [
    DesignerGlobalsService,
    ImageService,
    VideoService,
    ColorPickerService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DesignerModule {}