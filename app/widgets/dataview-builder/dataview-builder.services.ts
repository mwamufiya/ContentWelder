import {Injectable, ComponentFactoryResolver, ComponentFactory}     from '@angular/core';
import { Http } from '@angular/http';

import { DataViewBuilderService_I, DataViewBuilder_I, BuilderConfig } from './dataview-builder.interface';
import { RestDataViewBuilerService } from './dataview-builder-rest.service';

@Injectable()
export class DataViewBuilderService{
    selectedService: DataViewBuilderService_I;

    constructor(private http: Http){
    }

    /**
     * @function
     * @param source
     * @returns {WidgetServiceInterface}
     * @desc response for getting the widget service based on the requested source
     */
    serviceFactory(source:string):DataViewBuilderService_I{
        let tgtServ: DataViewBuilderService_I;

        switch(source){
            case 'rest':
                tgtServ = new RestDataViewBuilerService (this.http);
                break;
            case 'contentwelder':
                break;
            case 'salesforce':
                break;
        }

        return tgtServ;
    }

    /**
     * @function
     * @param { String } source - the source/server to retrieve the data from
     * @param { '{}' } params - parameters to search against
     */
    fetch(source: string, params: BuilderConfig):Promise<JSON>{
        return this.serviceFactory(source).fetch(params);
    }

}