export class Image{
    height:string;
    width:string;
    description:string;
    categories:Array<string>;
    
    constructor(private name:string,
        private url:string, 
        private id?:number){

     }
}