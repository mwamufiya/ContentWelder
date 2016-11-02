
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule} from '@angular/http';

/************3rd party*********** */
import { MaterialModule, MdIconRegistry} from '@angular/material';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

/*************Feature Modules *********************/
import { MediaChooser } from './media-chooser.component';
import { MediaChooserService } from './media-chooser-service';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { ImageService } from '../services/image.service';
import { VideoService } from '../services/video.service';

@NgModule({
    imports:[
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        MaterialModule,
        Ng2BootstrapModule
    ],
    declarations: [
        MediaChooser
    ],
    exports: [
        MediaChooser
    ],
    providers: [
        MediaChooserService,
        DesignerGlobalsService,
        ImageService,
        VideoService,
        MdIconRegistry
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AssetChooserModule {}