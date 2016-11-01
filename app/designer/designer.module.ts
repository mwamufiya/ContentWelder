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
import { MediaChooser } from '../asset-chooser/media-chooser.component';
import { CwDirectiveModule } from '../directives/directives.module';

/************3rd party*********** */
//import { ModalModule } from 'ng2-bootstrap/components/modal';
import { MaterialModule, MdIconRegistry} from '@angular/material';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

/*************Services************* */
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { ImageService } from '../services/image.service';
import { VideoService } from '../services/video.service';
import { FONTLIST } from '../services/fonts.service';


/**
 * @module
 * @description
 */
@NgModule({
  imports:[
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Ng2BootstrapModule,
    MaterialModule,
    DesignerRoutingModule,
    WidgetModule,
    CwDirectiveModule
  ],
  declarations: [ 
    DesignerComponent,
    DesignerToolsMenu,
    DesignerToolsComponent,
    MediaChooser,
  ],
  providers: [
    DesignerGlobalsService,
    ImageService,
    VideoService,
    MdIconRegistry
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DesignerModule {}