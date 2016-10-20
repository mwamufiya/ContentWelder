import { ElementRef } from '@angular/core';

export interface WidgetDrop{
    value:string;
    templateRef:ElementRef;
    insertionPoint:Number;
    items:Array<Object>;

}