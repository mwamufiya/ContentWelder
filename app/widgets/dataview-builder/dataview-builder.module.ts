import { NgModule, CUSTOM_ELEMENTS_SCHEMA }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

/************3rd party*********** */
import { NgSemanticModule } from 'ng-semantic';

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
        NgSemanticModule,
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
        DataViewBuilderService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DataviewBuilderModule {}