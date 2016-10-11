import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { DesignerToolsMenuInterface } from '../interfaces/designer-tools-menu.interface';

@Component({
  selector: 'designer-tools-menu',
  templateUrl: './app/components/designer-tools-menu.component.html',
  styleUrls: ['./app/components/designer-tools-menu.component.css'],
  inputs: ['configJson','isRoot']
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
    isRoot:boolean = false;
    //menuJson:Array<DesignerToolsMenuInterface>;
    configJson:DesignerToolsMenuInterface;
    children:Array<DesignerToolsMenuInterface> = new Array<DesignerToolsMenuInterface>();

    constructor(private _changeDetectorRef:ChangeDetectorRef){}

    ngOnInit(){
        //Angular Inputs only get initialized OnInit
        if(this.configJson) this.initalizeFromJson(this.configJson)
    }

    initalizeFromJson(json:DesignerToolsMenuInterface){
        if(json.value) this.value = json.value;
        if(json.label) this.label = json.label;
        if(json.title) this.title = json.title;
        if(json.isActive) this.isActive = json.isActive;
        if(json.icon) this.icon = json.icon;
        if(json.draggable) this.draggable = json.draggable;
        if(json.children) this.children = json.children;
        if(json.widgetConfig){ 
            this.widgetConfig = json.widgetConfig;
            this.widgetConfigString = JSON.stringify(this.widgetConfig);
        }
        //this._changeDetectorRef.markForCheck();
    }
    getWidgetConfigString():string{
        return JSON.stringify(this.widgetConfig);
    }

}