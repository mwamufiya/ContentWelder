import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

/**********Widget************** */
import { Widget } from '../widgets/widget.component';
import { BoxWidget } from '../widgets/widget-box.component';
import { ImageWidget } from '../widgets/widget-image.component';
import { VideoWidget } from '../widgets/widget-video.component';
import { TextboxWidget } from '../widgets/widget-textbox.component';
import { PageWidget }  from '../widgets/widget-page.component';
import { FormWidget }  from '../widgets/widget-form.component';
import { DesignerToolsComponent }  from './designer-tools.component';
import { DesignerComponent }  from './designer.component';

/***********Forms****************** */
import { QuestionService } from '../forms/question.service';
import { DynamicFormComponent } from '../forms/dynamic-form.component';
import { DynamicFormQuestionComponent } from '../forms/dynamic-form-question.component';

/************3rd party*********** */
//import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgSemanticModule } from 'ng-semantic';
import {ColorPickerDirective, ColorPickerService} from 'angular2-color-picker';

/***********Helpers************ */

import { ResizeHandles } from '../directives/resizehandles.component';
import { DesignerToolsMenu } from './designer-tools-menu.component';
import { ImageChooser } from '../asset-chooser/image-chooser.component';

/*************Directives***********/
import { DesignerDroppable }  from '../directives/designer-droppable.directive';
import { DesignerDraggable }  from '../directives/designer-draggable.directive';
import { Resize }  from '../directives/resize.directive';
import { WidgetTemplateFactory } from '../directives/widget-template-factory.directive';
import { BorderSelection } from '../widgets/border-selection.component';

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
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [ 
    DesignerComponent,
    Widget,
    PageWidget, 
    BoxWidget, 
    ImageWidget, 
    VideoWidget,
    TextboxWidget,
    FormWidget,
    ResizeHandles,
    DesignerDraggable,
    DesignerDroppable,
    Resize,
    BorderSelection,
    WidgetTemplateFactory,
    DesignerToolsMenu,
    ImageChooser,
    DesignerToolsComponent,
    ColorPickerDirective,
    DynamicFormComponent,
    DynamicFormQuestionComponent
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
    ColorPickerService,
    QuestionService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DesignerModule {}