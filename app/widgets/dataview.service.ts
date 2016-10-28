import {Injectable, ComponentFactoryResolver, ComponentFactory}     from '@angular/core';
import { Http } from '@angular/http';
import { WidgetServiceInterface} from './widget.interface';
import { WidgetConfig } from './widget.interface';
import { JsonServerWidgetService } from './widget-jsonserver.service';
import { WidgetFactory} from './widget-factory';
import {Widget} from "./widget.component";

@Injectable()
export class DataviewService{
    defaultSource: string = 'jsonserver';
    selectedService: WidgetServiceInterface;

    constructor(private http: Http){
    }

    /**
     * @function
     * @param source
     * @returns {WidgetServiceInterface}
     * @desc response for getting the widget service based on the requested source
     */
    widgetServiceFactory(source:string):WidgetServiceInterface{
        source = source ? source.trim().toLowerCase() : this.defaultSource;

        let tgtServ: WidgetServiceInterface;

        switch(source){
            case 'jsonserver':
                tgtServ = new JsonServerWidgetService(this.http);
                break;
            case 'contentwelder':
                break;
        }

        return tgtServ;
    }

    /**
     * @function
     * @param { String } source - the source/server to retrieve the data from
     * @param { '{}' } params - parameters to search against
     */
    search(source: string, params?: {}):Promise<WidgetConfig>{
        return this.widgetServiceFactory(source).search(params);
    }

    save(source: string, params: {}): Promise<JSON>{
        return this.widgetServiceFactory(source).save(params);
    }

    /**
     * @function
     * @param widgetType
     * @desc responsible for returning a component Factory based on widget type
     */
    getFactory(cResolver: ComponentFactoryResolver, widgetType:string): ComponentFactory<Widget>{
        let factory = new WidgetFactory();
        return factory.getWidgetFactory(cResolver, widgetType);
    }
}