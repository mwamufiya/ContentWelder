import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Image } from '../components/image';
import { GoogleImageSearchService } from './image.google.service';
import { PixabaySearcService } from './image.pixabay.service';
import { ImageServiceInterface } from '../interfaces/image-service.interface';

@Injectable()
export class ImageService {
    source:string;
    searchTerm:string;
    selectedService: ImageServiceInterface;

    constructor(private http: Http){
    }

    //Return list of images
    getImages(imageSource:string, keyword?:string):Promise<Image[]>{
        //Save the search term as this service is used elsewhere
        this.searchTerm = keyword;

        /*let arr = new Array();
        let index = 0;
        for(let i=1; i<6; i++){
         arr.push(new Image(`baloon`, `http://www.bestmotherofthegroomspeeches.com/wp-content/themes/thesis/rotator/sample-${i}.jpg`));
        }*/
        //return Promise.resolve(arr);
        let results:Promise<Image[]>;

        //AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU
        //AIzaSyAJ2HOfksKRRaJhXj0aZ1B-hpS0s7JXyyY
        switch(imageSource){
            case 'google':
                let googleApiKey = `AIzaSyAJ2HOfksKRRaJhXj0aZ1B-hpS0s7JXyyY`;
                let googleCustomEngineKey = `002827374348489201537:dr2ug-z_0uy`;
                this.selectedService = new GoogleImageSearchService(this.http,  googleApiKey, googleCustomEngineKey);
                break;
            case 'pixabay':
                let apiKey = `2424300-5cdd98574b4700f02902d8fa9`;
                this.selectedService = new PixabaySearcService(this.http, apiKey);
                break;
            default:
                break;
        }
        if(this.selectedService)
            return this.selectedService.getImages(this.searchTerm);
        else{
            //TODO: add logic for when no matching Image Service is found
        }
    }

}