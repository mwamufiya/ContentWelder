import { Image } from '../components/Image';

export interface ImageServiceInterface{
    getImages(query?:string):Promise<Image[]>
}