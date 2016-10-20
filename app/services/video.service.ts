import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { Video } from '../widgets/video';
import { PixabayVideoSearchService } from './video.pixabay.service';
import { VideoSearchServiceInterface } from '../interfaces/media-search-service.interface';

@Injectable()
export class VideoService {
    source:string;
    searchTerm:string;
    selectedService: VideoSearchServiceInterface;

    constructor(private http: Http){
    }

    //Return list of images
    search(imageSource:string, keyword?:string):Promise<Video[]>{
        //Save the search term as this service is used elsewhere
        this.searchTerm = keyword;

        let results:Promise<Video[]>;

        switch(imageSource){
            case 'pixabay':
                let apiKey = `2424300-5cdd98574b4700f02902d8fa9`;
                this.selectedService = new PixabayVideoSearchService(this.http, apiKey);
                break;
            default:
                break;
        }
        if(this.selectedService)
            return this.selectedService.search(this.searchTerm);
        else{
            //TODO: add logic for when no matching Image Service is found
        }
    }

}