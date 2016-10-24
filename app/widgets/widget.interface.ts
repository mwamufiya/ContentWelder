import { ElementRef } from '@angular/core';
import { Widget } from './widget.component';

export interface WidgetConfig{
    widgetType:string;                  //the type of WidgetJSON
    name?:string;
    style?:CSSStyleDeclaration;         //Holds all style attributes
    items?:Array<WidgetConfig>          //Collection of child widgets

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

export interface WidgetResize{
    height:number;
    width:number;
    unit?:string;                //the unit of measurement that the dimensions are in (Future use)
}