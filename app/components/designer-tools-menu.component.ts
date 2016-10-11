import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { DesignerToolsMenuInterface } from '../interfaces/designer-tools-menu.interface';

@Component({
  selector: 'designer-tools-menu',
  templateUrl: './app/components/designer-tools-menu.component.html',
  inputs: ['children']
})
export class DesignerToolsMenu implements DesignerToolsMenuInterface, OnInit{
    value:string;
    label:string;
    title:string;
    isActive:boolean;
    click:string;
    icon:string;
    draggable:boolean;
    widgetConfig:Object;
    widgetConfigString:string;
    //menuJson:Array<DesignerToolsMenuInterface>;
    children:Array<DesignerToolsMenuInterface>;

    constructor(private _changeDetectorRef:ChangeDetectorRef){}

    ngOnInit(){
        //this.children = this.menuJson;
        this.widgetConfigString = (this.widgetConfig)? JSON.stringify(this.widgetConfig) : '';
        this._changeDetectorRef.markForCheck();
        console.log(this.widgetConfigString);
    }


}