import { Widget } from '../widgets/widget.component';

export interface WidgetConfig{
    type:string; //the type of WidgetJSON
    position?:number;    // array index for this current item within the parent's list of children
    style:CSSStyleDeclaration;
    items?:Array<Widget>
     
}

export interface WidgetComs{
    action:string;          //the action to be taken.
    item:Widget;            //The widget upon which an action must be taken.
}