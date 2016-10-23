import { ElementRef } from '@angular/core';
import { Widget } from './widget.component';

export interface WidgetConfig{
    type:string; //the type of WidgetJSON
    position?:number;    // array index for this current item within the parent's list of children
    style?:CSSStyleDeclaration;
    items?:Array<WidgetConfig>

}

export interface WidgetComs{
    action:string;          //the action to be taken.
    item:Widget;            //The widget upon which an action must be taken.
}

export interface WidgetServiceInterface {
    search(params:{}):Promise<WidgetConfig>
    save(params:{}):Promise<JSON>
}

export interface WidgetDrop{
    value:string;
    templateRef:ElementRef;
    items:Array<Object>;
    insertionPoint?:Number;
}

export interface WidgetJson{

}