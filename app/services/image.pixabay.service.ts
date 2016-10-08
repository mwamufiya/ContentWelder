import { Http, Headers, Response, RequestOptionsArgs, URLSearchParams, QueryEncoder } from '@angular/http';
import { Image } from '../components/image';
import { ImageServiceInterface } from '../interfaces/image-service.interface';
import 'rxjs/add/operator/toPromise';

export class PixabaySearcService implements ImageServiceInterface{
    private searchTerm?:string;
    private SERVICE_URL: string = `https://pixabay.com/api/`;

    //TODO move the API Keys to the server
    constructor(
        private http: Http,
        private API_KEY:string){
    }
    generateParams():URLSearchParams{
        let params = new URLSearchParams();
        params.set('key', this.API_KEY);
        params.set('q', this.searchTerm.replace(/ /g,"+"));

        return params;
    }

    getImages(query?:string):Promise<Image[]>{
        //Since Google doesn't return images for empty queries, don't waste the roundtrip
        if(!query || !query.length){
            let results:Promise<Image[]>;
            return Promise.resolve(results);
        }
        this.searchTerm = query;
        let params = this.generateParams();
        return this.http.get(this.SERVICE_URL, {search: params})
            .toPromise()
            .then(response => this.handleSearchResponse(response))
            .catch(response => this.handleSearchError(response))
    }
    //Conver raw JSON to an array of Image objects
    handleSearchResponse(response):Promise<Image[]>{
        let resultJson = JSON.parse(response._body);
        let imageList = new Array<Image>();

        //process only if there are actual resutls from the search 
        if(resultJson.hits){
            for(let i=0; i < resultJson.hits.length; i++){
                let item = resultJson.hits[i];
                let jsonConfig = {
                    id: item.id,
                    width: item.imageWidth,
                    height: item.imageHeight,
                    views: item.views,
                    favorites: item.favorites,
                    likes: item.likes,
                    lowResLink: item.previewURL,
                    medResLink: item.webformatURL
                };
                let img = new Image(item.link, 'pixabay', jsonConfig);

                imageList.push(img);
            }
        }
        return Promise.resolve(imageList);
    }
    //Handle a searc error.
    handleSearchError(response){
        //TODO: add handling of search error
        //console.log(response);
        let status = response.status;
        let errorMessage =  `Pixabay Image Search Error: `;
        if(response._body){
            let bodyJson = JSON.parse(response._body);
            errorMessage += `"${bodyJson.error.message}"`;
        }
        
        console.log(errorMessage);
    }

}