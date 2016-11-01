
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

/**********Routing***************/

/************3rd party*********** */
//import { ModalModule } from 'ng2-bootstrap/components/modal';
import { MaterialModule} from '@angular/material';

import { DesignerDroppable }  from '../directives/designer-droppable.directive';
import { DesignerDraggable }  from '../directives/designer-draggable.directive';
import { Resize }  from '../directives/resize.directive';
import { WidgetTemplateFactory } from './widget-template-factory.directive';
import {ColorPickerDirective, ColorPickerService} from 'angular2-color-picker';

@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    declarations: [
        Resize,
        WidgetTemplateFactory,
        DesignerDroppable,
        DesignerDraggable,
        ColorPickerDirective
    ],
    exports: [
        Resize,
        WidgetTemplateFactory,
        DesignerDroppable,
        DesignerDraggable,
        ColorPickerDirective
    ],
    providers: [
        ColorPickerService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CwDirectiveModule {}