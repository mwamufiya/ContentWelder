import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { WidgetServiceInterface} from './widget.interface';
import { WidgetConfig } from './widget.interface';
import { JsonServerWidgetService } from './widget-jsonserver.service';

@Injectable()
export class WidgetService implements WidgetServiceInterface{
    defaultSource: string = 'jsonserver';
    selectedService: WidgetServiceInterface;

    constructor(private http: Http){
    }

    /**
     * @function
     * @param { String } source - the source/server to retrieve the data from
     * @param { '{}' } params - parameters to search against
     */
    search(source?: string, params?: {}):Promise<WidgetConfig>{
        source = source ? source.trim().toLowerCase() : this.defaultSource;

        switch(source){
            case 'jsonserver':
                this.selectedService = new JsonServerWidgetService(this.http);
                break;
            case 'contentwelder':
                break;
        }
        return this.selectedService.search(params);
    }
}