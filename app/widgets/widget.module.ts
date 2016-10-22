
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

/**********Routing***************/

/************3rd party*********** */
//import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgSemanticModule } from 'ng-semantic';

/**********Widget************** */
import { Widget } from '../widgets/widget.component';
import { BoxWidget } from '../widgets/widget-box.component';
import { ImageWidget } from '../widgets/widget-image.component';
import { VideoWidget } from '../widgets/widget-video.component';
import { TextboxWidget } from '../widgets/widget-textbox.component';
import { PageWidget }  from '../widgets/widget-page.component';
import { FormWidget }  from '../widgets/widget-form.component';

/***********Forms****************** */
import { QuestionService } from '../forms/question.service';
import { DynamicFormComponent } from '../forms/dynamic-form.component';
import { DynamicFormQuestionComponent } from '../forms/dynamic-form-question.component';

/***********Helpers************ */
import { ResizeHandles } from '../directives/resizehandles.component';

/*************Directives***********/
import { DesignerDroppable }  from '../directives/designer-droppable.directive';
import { DesignerDraggable }  from '../directives/designer-draggable.directive';
import { Resize }  from '../directives/resize.directive';
import { WidgetTemplateFactory } from '../directives/widget-template-factory.directive';
import { BorderSelection } from '../widgets/border-selection.component';
import {ColorPickerDirective, ColorPickerService} from 'angular2-color-picker';

/*************Services************* */
import { ImageService } from '../services/image.service';
import { VideoService } from '../services/video.service';
import { WidgetService } from './widget.service';
import { FONTLIST } from '../services/fonts.service';

@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        NgSemanticModule
    ],
    declarations: [
        Widget,
        PageWidget,
        BoxWidget,
        ImageWidget,
        VideoWidget,
        TextboxWidget,
        FormWidget,
        ResizeHandles,
        Resize,
        BorderSelection,
        WidgetTemplateFactory,
        DynamicFormComponent,
        DynamicFormQuestionComponent,
        ColorPickerDirective,
        DesignerDroppable,
    ],
    exports: [
        Widget,
        PageWidget,
        BoxWidget,
        ImageWidget,
        VideoWidget,
        TextboxWidget,
        FormWidget
    ],
    providers: [
        ColorPickerService,
        QuestionService,
        WidgetService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class WidgetModule {}