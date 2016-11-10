
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
import { MakeDroppable } from './make-droppable.directive'
import { MakeDraggable} from './make-draggable.directive'

@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        Resize,
        WidgetTemplateFactory,
        DesignerDroppable,
        DesignerDraggable,
        MakeDroppable,
        MakeDraggable
    ],
    exports: [
        Resize,
        WidgetTemplateFactory,
        DesignerDroppable,
        DesignerDraggable
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CwDirectiveModule {}