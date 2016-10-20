import { Image } from '../widgets/image';
import { Video } from '../widgets/video';

export interface ImageSearchServiceInterface{
    search(query?:string):Promise<Image[]>
}

export interface VideoSearchServiceInterface{
    search(query?:string):Promise<Video[]>
}