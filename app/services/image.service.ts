import { Injectable }     from '@angular/core';
import { Http } from '@angular/http';
import { Image } from '../widgets/image';
import { GoogleImageSearchService } from './image.google.service';
import { PixabayImageSearchService } from './image.pixabay.service';
import { ImageSearchServiceInterface } from '../interfaces/media-search-service.interface';

@Injectable()
export class ImageService {
    source:string;
    searchTerm:string;
    selectedService: ImageSearchServiceInterface;

    constructor(private http: Http){
    }

    //Return list of images
    search(imageSource:string, keyword?:string):Promise<Image[]>{
        //Save the search term as this service is used elsewhere
        this.searchTerm = keyword;
        let results:Promise<Image[]>;

        //AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU
        //AIzaSyAJ2HOfksKRRaJhXj0aZ1B-hpS0s7JXyyY
        switch(imageSource){
            case 'google':
                let googleApiKey = `AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU`;
                let googleCustomEngineKey = `002827374348489201537:dr2ug-z_0uy`;
                this.selectedService = new GoogleImageSearchService(this.http,  googleApiKey, googleCustomEngineKey);
                break;
            case 'pixabay':
                let apiKey = `2424300-5cdd98574b4700f02902d8fa9`;
                this.selectedService = new PixabayImageSearchService(this.http, apiKey);
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