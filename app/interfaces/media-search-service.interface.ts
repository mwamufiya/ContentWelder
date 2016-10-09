import { Image } from '../components/image';
import { Video } from '../components/video';

export interface ImageSearchServiceInterface{
    search(query?:string):Promise<Image[]>
}

export interface VideoSearchServiceInterface{
    search(query?:string):Promise<Video[]>
}