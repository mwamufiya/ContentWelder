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
    tags:string;                    //keywords associated with this image
    source:string;                  //the source of the image Google image, pixabay, instgram, contentwelder etc...
    
    constructor( url:string, source:string, jsonConfig?:VideoConfigInterface){
        this.url = url;
        this.source = source;
        if(jsonConfig)
            this.setPropertiesFromJSON(jsonConfig);
     }
     //Parse a JSON object to set a series of properties in one fell swoop 
     setPropertiesFromJSON(json:VideoConfigInterface):void{
         if(json.source) this.source = json.source;
         if(json.name) this.name = json.name;
         if(json.id) this.id = json.id;
         if(json.height) this.height = json.height;
         if(json.width) this.width = json.width;
         if(json.description) this.description = json.description;
         if(json.fileSize) this.fileSize = json.fileSize;
         if(json.url) this.url = json.url;
         if(json.favorites) this.favorites = json.favorites;
         if(json.likes) this.likes = json.likes;
         if(json.tags) this.tags = json.tags;
     }
}