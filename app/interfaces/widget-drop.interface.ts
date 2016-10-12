import { ElementRef } from '@angular/core';
import { Parent } from '../components/parent';

export interface WidgetDrop{
    value:string;
    templateRef:ElementRef;
    insertionPoint:Number;
    items:Array<Object>;

}