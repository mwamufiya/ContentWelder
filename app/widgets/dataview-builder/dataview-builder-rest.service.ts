import { Http, URLSearchParams, RequestOptionsArgs, Headers, RequestOptions, RequestMethod,
    Request
} from '@angular/http';
import { DataViewBuilderService_I, DataViewBuilder_I, BuilderConfig} from './dataview-builder.interface';
import { RestDataViewBuilder_I } from './dataview-builder-rest.component';

export class RestDataViewBuilerService implements DataViewBuilderService_I{
    constructor(private http: Http){}

    fetch(config: RestDataViewBuilder_I):Promise<JSON> {
        //map to the correct format for typings
        //let config = builderConfig as RestDataViewBuilder_I;

        //process any headers
        let headers = new Headers();
        if (config.headers) {
            config.headers.forEach(header => {
                headers.append(header.name, header.value)
            });
        } else {
            headers.append('Content-Type', 'application/json');
        }

        //Process any parameters
        let prms = new URLSearchParams();
        if(config.params && config.params.length){
            config.params.forEach(param => {
                prms.set(param.name, param.value);
            });
        }

        let url = config.host + (config.path? `/${config.path}` : ``);

        let options = new RequestOptions({
           method: config.httpMethod,
            url: url,
            headers: headers,
            search: prms
        });

        return this.http.request(new Request(options))
            .toPromise()
            .then( response => this.handleFetchResponse(response))
            .catch( response => this.handleFetchError(response));
    }

    handleFetchResponse(response):Promise<JSON>{
        return JSON.parse(response._body);
    }
    handleFetchError(response){
        console.log(response);
    }
}