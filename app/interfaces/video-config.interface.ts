export interface VideoConfigInterface{
    url?:string;
    fileSize?:number;
    height?:number;
    width?:number;
    id?:number;
    name?:string;
    favorites?:number;
    likes?:number;
    tags?:string;                    
    source?:string;
    thumbnailLink?:string;
    smallLink?:VideoConfigInterface;
    mediumLink?:VideoConfigInterface;
    largeLink?:VideoConfigInterface;

}