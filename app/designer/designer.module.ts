import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

/**********Routing***************/
import {DesignerRoutingModule} from './designer-routing.module';

/**********Widget************** */
import { DesignerToolsComponent }  from './designer-tools.component';
import { DesignerToolsMenu }  from './designer-tools-menu.component';
import { DesignerComponent }  from './designer.component';
import { WidgetModule  } from '../widgets/widget.module';
import { ImageChooser } from '../asset-chooser/image-chooser.component';
import { CwDirectiveModule } from '../directives/directives.module';

/************3rd party*********** */
//import { ModalModule } from 'ng2-bootstrap/components/modal';
import { NgSemanticModule } from 'ng-semantic';

/*************Services************* */
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { ImageService } from '../services/image.service';
import { VideoService } from '../services/video.service';
import { FONTLIST } from '../services/fonts.service';

/*************Directives***********/
import { DesignerDroppable }  from '../directives/designer-droppable.directive';
import { DesignerDraggable }  from '../directives/designer-draggable.directive';


@NgModule({
  imports:[
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgSemanticModule,
    DesignerRoutingModule,
    WidgetModule,
    CwDirectiveModule
  ],
  declarations: [ 
    DesignerComponent,
    DesignerToolsMenu,
    DesignerToolsComponent,
    ImageChooser,
  ],
  providers: [
    DesignerGlobalsService,
    ImageService,
    VideoService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DesignerModule {}