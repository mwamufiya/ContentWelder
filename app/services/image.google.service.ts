import { Http, Headers, Response, RequestOptionsArgs, URLSearchParams, QueryEncoder } from '@angular/http';
import { Image } from '../components/image';
import { ImageServiceInterface } from '../interfaces/image-service.interface';
import 'rxjs/add/operator/toPromise';



export class GoogleImageSearchService implements ImageServiceInterface{
    private searchTerm?:string;
    private SERVICE_URL: string = `https://www.googleapis.com/customsearch/v1`;

    //TODO move the API Keys to the server
    constructor(
        private http: Http,
        private googleApiKey:string,
        private googleCustomEngineKey:string){
    }
    generateParams():URLSearchParams{
        let params = new URLSearchParams();
        params.set('key', this.googleApiKey);
        params.set('cx', this.googleCustomEngineKey);
        params.set('searchType', 'image');
        params.set('q', this.searchTerm);

        return params;
    }

    getImages(query?:string):Promise<Image[]>{
        //Since Google doesn't return images for empty queries, don't waste the roundtrip
        if(!query || !query.length){
            let results:Promise<Image[]>;
            return Promise.resolve(results);
        }
        console.log(query);
        this.searchTerm = query;
        let params = this.generateParams();
        return this.http.get(this.SERVICE_URL, {search: params})
            .toPromise()
            .then(response => this.handleSearchResponse(response))
            .catch(response => this.handleSearchError(response))
    }
    //Conver raw JSON to an array of Image objects
    handleSearchResponse(response):Promise<Image[]>{
        console.log(response);
        let resultJson = JSON.parse(response._body);
        console.log(resultJson);
        let imageList:Image[];

        //process only if there are actual resutls from the search 
        /*if(resultJson.items){
            for(let i=0; i < resultJson.items.length; i++){
                let item = resultJson.items[i];
                let jsonConfig = {

                };
                let img = new Image(item.link);

                imageList.push(img);
            }
        }*/

        return Promise.resolve(imageList);
    }
    //Handle a searc error.
    handleSearchError(response){
        //TODO: add handling of search error
        console.log(response);
        let status = response.status;
        let errorMessage =  `Google Image Search Error: `;
        if(response._body){
            let bodyJson = JSON.parse(response._body);
            errorMessage += `"${bodyJson.error.message}"`;
        }
        
        console.log(errorMessage);
    }

}