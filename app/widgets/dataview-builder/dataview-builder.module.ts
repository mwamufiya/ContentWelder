import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

/************3rd party*********** */
import { MaterialModule, MdIconRegistry} from '@angular/material';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

/**************Module Specific**********************/
import { RestDataViewBuilder } from './dataview-builder-rest.component';
import { DataViewBuilder } from './dataview-builder.component';
import { DataViewBuilderService } from './dataview-builder.services';
import { DataGrid } from './data-grid.component';

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
        DataViewBuilder,
        RestDataViewBuilder,
        DataGrid
    ],
    exports: [
        DataViewBuilder,
        RestDataViewBuilder,
        DataGrid
    ],
    providers: [
        DataViewBuilderService,
        MdIconRegistry
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DataviewBuilderModule {}