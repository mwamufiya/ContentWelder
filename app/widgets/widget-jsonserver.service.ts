import {
    Http, URLSearchParams, RequestOptionsArgs, Headers, RequestOptions, RequestMethod,
    Request
} from '@angular/http';
import { WidgetConfig, WidgetServiceInterface } from './widget.interface';


export class JsonServerWidgetService implements WidgetServiceInterface {
    SERVICE_URL:string = 'http://localhost:3010'
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

    /**
     * @function
     * @param params
     * @desc Saves data to json server
     */
    save(params: {}):Promise<JSON> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({
                method: params['id']? RequestMethod.Put : RequestMethod.Post,
                url: `${this.SERVICE_URL}/widgets/${params['id']? params['id'] : ''}`,
                headers: headers,
                body: params
            });

        return this.http.request(new Request(options))
            .toPromise()
            .then( response => this.handleSaveResponse(response))
            .catch( response => this.handleSaveError(response));

        /*if(params['id'])
            this.http.put(
                `${this.SERVICE_URL}/widgets/${id}`,
                params,
                headers)
                .toPromise()
                .then( response => this.handleSaveError(response))
                .catch( response => this.handleSaveError(response));
        else
            this.http.post(
                `${this.SERVICE_URL}/widgets/`,
                params,
                headers)
                .toPromise()
                .then( response => this.handleSaveError(response))
                .catch( response => this.handleSaveError(response));*/
    }
    handleSaveResponse(response):Promise<JSON>{
        console.log(response);
        return null;
    }
    handleSaveError(response){
        console.log(response);
    }
}