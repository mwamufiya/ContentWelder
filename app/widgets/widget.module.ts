
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

/**********Routing***************/

/************3rd party*********** */
import { MaterialModule, MdIconRegistry} from '@angular/material';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

/**********Widget************** */
import { Widget } from '../widgets/widget.component';
import { BoxWidget } from '../widgets/widget-box.component';
import { ImageWidget } from '../widgets/widget-image.component';
import { VideoWidget } from '../widgets/widget-video.component';
import { TextboxWidget } from '../widgets/widget-textbox.component';
import { PageWidget }  from '../widgets/widget-page.component';
import { FormWidget }  from '../widgets/widget-form.component';
import { DataviewWidget }  from '../widgets/widget-dataview.component';

/***********Forms****************** */
import { QuestionService } from '../forms/question.service';
import { DynamicFormComponent } from '../forms/dynamic-form.component';
import { DynamicFormQuestionComponent } from '../forms/dynamic-form-question.component';

/***********Helpers************ */
import { ResizeHandles } from '../directives/resizehandles.component';
import { DataviewBuilderModule } from './dataview-builder/dataview-builder.module';

/*************Directives***********/
import { CwDirectiveModule } from '../directives/directives.module';
import { BorderSelection}  from './border-selection.component';
import { TextStyleSelection } from './textstyle-selection.component';

/***************Routing**********************/
import { WidgetRoutingModule }  from './widget-routing.module';


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
        MaterialModule,
        CwDirectiveModule,
        WidgetRoutingModule,
        DataviewBuilderModule,
        Ng2BootstrapModule
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
        DynamicFormComponent,
        DynamicFormQuestionComponent,
        BorderSelection,
        DataviewWidget,
        TextStyleSelection
    ],
    exports: [
        Widget,
        PageWidget,
        BoxWidget,
        ImageWidget,
        VideoWidget,
        TextboxWidget,
        FormWidget,
        BorderSelection,
        DataviewWidget,
        TextStyleSelection
    ],
    providers: [
        QuestionService,
        WidgetService,
        MdIconRegistry
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class WidgetModule {}