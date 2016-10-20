import { VideoConfigInterface } from '../interfaces/video-config.interface';
export class Video implements VideoConfigInterface{
    url:string;
    height:number;
    width:number;
    description:string;
    id:number;
    fileSize:number;
    name:string;
    favorites:number;
    likes:number;
    source:string;                  //the source of the asset-chooser Google asset-chooser, pixabay, instgram, contentwelder etc...
    thumbnailLink:string;              //Link to the static asset-chooser before the video loads.
    smallLink:VideoConfigInterface;
    mediumLink:VideoConfigInterface
    largeLink:VideoConfigInterface
    isActive:boolean = false;
    
    constructor( url:string, source:string, jsonConfig?:VideoConfigInterface){
        this.url = url;
        this.source = source;
        if(jsonConfig)
            this.setPropertiesFromJSON(jsonConfig);
     }
     //Parse a JSON object to set a series of properties in one fell swoop 
     setPropertiesFromJSON(json:VideoConfigInterface):void{
        if(json.source) this.source = json.source;
        if(json.id) this.id = json.id;
        if(json.height) this.height = json.height;
        if(json.width) this.width = json.width;
        if(json.url) this.url = json.url;
        if(json.favorites) this.favorites = json.favorites;
        if(json.likes) this.likes = json.likes;
        if(json.thumbnailLink) this.thumbnailLink = json.thumbnailLink;
        if(json.smallLink){
             this.smallLink = {
                 url: json.smallLink.url,
                 width: json.smallLink.width,
                 height: json.smallLink.height,
                 fileSize: json.smallLink.fileSize,
             };
        }
        if(json.mediumLink){ 
            this.mediumLink = {
                 url: json.mediumLink.url,
                 width: json.mediumLink.width,
                 height: json.mediumLink.height,
                 fileSize: json.mediumLink.fileSize,
             };
        }
        if(json.largeLink){
            this.largeLink = {
                 url: json.largeLink.url,
                 width: json.largeLink.width,
                 height: json.largeLink.height,
                 fileSize: json.largeLink.fileSize,
             };
        }
     }
}