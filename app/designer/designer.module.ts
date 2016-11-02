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
import { CwDirectiveModule } from '../directives/directives.module';
import { AssetChooserModule } from '../asset-chooser/asset-chooser.module';

/************3rd party*********** */
import { MaterialModule, MdIconRegistry} from '@angular/material';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

/*************Services************* */
import { DesignerGlobalsService } from '../services/designer-globals.service';


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
    CwDirectiveModule,
    AssetChooserModule
  ],
  declarations: [ 
    DesignerComponent,
    DesignerToolsMenu,
    DesignerToolsComponent,
  ],
  providers: [
    DesignerGlobalsService,
    MdIconRegistry
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DesignerModule {}