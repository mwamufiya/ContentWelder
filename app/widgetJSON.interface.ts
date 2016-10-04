export interface WidgetJSON extends Element{
    type:string; //the type of WidgetJSON
    position:number;    // array index for this current item within the parent's list of children
    width:number;
    height:number;
    opacity:number;
     
}