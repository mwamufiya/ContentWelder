import { Http, URLSearchParams } from '@angular/http';
import { WidgetConfig, WidgetServiceInterface } from './widget.interface';


export class JsonServerWidgetService implements WidgetServiceInterface {
    SERVICE_URL:string = 'http://localhost:3001'
    constructor(private http: Http){}

    /**
     *
     * @param params - array of WidgetConfig Returned from searc
     * @description fetches a list of widget
     */
    search(params: {}):Promise<WidgetConfig>{
        let id = params['id']? params['id'] : '';
        let rParams = new URLSearchParams();


        return this.http.get(`${this.SERVICE_URL}/widgets/${id}`)
            .toPromise()
            .then(response => this.handleSearchResponse(response))
            .catch(response => this.handleSearchError(response))
    }
    handleSearchResponse(response):Promise<WidgetConfig>{
        return JSON.parse(response._body);
    }

    handleSearchError(response){
        console.log(response);
    }
}