import { Http, Headers, Response, RequestOptionsArgs, URLSearchParams, QueryEncoder } from '@angular/http';
import { Video } from '../components/video';
import { VideoSearchServiceInterface } from '../interfaces/media-search-service.interface';
import 'rxjs/add/operator/toPromise';

export class PixabayVideoSearchService implements VideoSearchServiceInterface{
    private searchTerm?:string;
    //TODO: These need to be moved out of this class into a global location
    private VIDEO_SERVICE_URL: string = `https://pixabay.com/api/videos`;
    private IMAGE_SERVICE_URL: string = `https://pixabay.com/api/`;

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

    search(query?:string):Promise<Video[]>{
        //Since Google doesn't return images for empty queries, don't waste the roundtrip
        if(!query || !query.length){
            let results:Promise<Video[]>;
            return Promise.resolve(results);
        }
        this.searchTerm = query;
        let params = this.generateParams();
        return this.http.get(this.VIDEO_SERVICE_URL, {search: params})
            .toPromise()
            .then(response => this.handleSearchResponse(response))
            .catch(response => this.handleSearchError(response))
    }
    //Conver raw JSON to an array of Image objects
    handleSearchResponse(response):Promise<Video[]>{
        let resultJson = JSON.parse(response._body);
        let imageList = new Array<Video>();

        //process only if there are actual resutls from the search 
        if(resultJson.hits){
            for(let i=0; i < resultJson.hits.length; i++){
                let item = resultJson.hits[i];
                let jsonConfig = {
                    id: item.id,
                    views: item.views,
                    favorites: item.favorites,
                    likes: item.likes,
                    //Pixabay videos returns an ID so the link to the specific image has to be configured
                    thumbnailLink: `${this.IMAGE_SERVICE_URL}?key=${this.API_KEY}&id=${item.picture_id}`,            
                    smallLink: {
                        url: item.videos.small.url,
                        width: item.videos.small.width,
                        height: item.videos.small.height,
                        fileSize: item.videos.small.size
                    },
                    mediumLink: {
                        url: item.videos.medium.url,
                        width: item.videos.medium.width,
                        height: item.videos.medium.height,
                        fileSize: item.videos.medium.size
                    },
                    largeLink: {
                        url: item.videos.large.url,
                        width: item.videos.large.width,
                        height: item.videos.large.height,
                        fileSize: item.videos.large.size
                    },
                };
                let img = new Video(item.link, 'pixabay', jsonConfig);

                imageList.push(img);
            }
        }
        return Promise.resolve(imageList);
    }
    //Handle a searc error.
    handleSearchError(response){
        //TODO: add handling of search error
        console.log(response);
        let status = response.status;
        let errorMessage =  `Pixabay Image Search Error: `;
        if(response._body){
            let bodyJson = JSON.parse(response._body);
            errorMessage += `"${bodyJson.error.message}"`;
        }
        
        console.log(errorMessage);
    }

}