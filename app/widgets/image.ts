import { ImageConfigInterface } from '../interfaces/image-config.interface';
export class Image{
    height:number;
    width:number;
    description:string;
    categories:Array<string>;
    id:number;
    fileSize:number;
    name:string;
    lowResLink:string;
    medResLink:string;
    highResLink:string;
    favorites:number;
    likes:number;
    tags:string;                    //keywords associated with this asset-chooser
    source:string;                  //the source of the asset-chooser Google asset-chooser, pixabay, instgram, contentwelder etc...
    
    constructor( url:string, source:string, jsonConfig?:ImageConfigInterface){
        this.lowResLink = url;
        this.source = source;
        if(jsonConfig)
            this.setPropertiesFromJSON(jsonConfig);
     }
     //Parse a JSON object to set a series of properties in one fell swoop 
     setPropertiesFromJSON(json:ImageConfigInterface):void{
         if(json.source) this.source = json.source;
         if(json.name) this.name = json.name;
         if(json.id) this.id = json.id;
         if(json.height) this.height = json.height;
         if(json.width) this.width = json.width;
         if(json.description) this.description = json.description;
         if(json.fileSize) this.fileSize = json.fileSize;
         if(json.lowResLink) this.lowResLink = json.lowResLink;
         if(json.medResLink) this.medResLink = json.medResLink;
         if(json.highResLink) this.highResLink = json.highResLink;
         if(json.favorites) this.favorites = json.favorites;
         if(json.likes) this.likes = json.likes;
         if(json.tags) this.tags = json.tags;
     }

}