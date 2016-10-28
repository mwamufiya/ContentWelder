import { Component, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef,
    ViewChild, forwardRef, HostListener, OnDestroy } from '@angular/core';
import { Widget  } from './widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Parent } from './parent';
import { WidgetConfig } from './widget.interface';

@Component({
    moduleId: module.id,
    selector: 'designer-dataview',
    templateUrl: 'widget-dataview.component.html',
    styleUrls: ['widget-dataview.component.css'],
    inputs: ['widgetConfig'],
    providers: [
        {
            provide: Parent,
            useExisting: forwardRef(() => DataviewWidget)
        }
    ]
})

export class DataviewWidget extends Widget implements OnDestroy{
    widgetType:string = 'dataviewwidget';
    restConfig:RestConfig;
    dispSettings:boolean;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){

        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);

        //Debug only
        //TODO remove this once integrated with Designer
        this.isSelected = true;
        this.restConfig = {};
        this.restConfig.httpMethod = 'get';

    }
    @HostListener('click', ['$event']) onclick(event):boolean{
        return super.onclick(event);
    }

    /**
     * @function
     * @description toggles the settings screen
     */
    toggleSettings():void{
        this.dispSettings = (this.dispSettings==true)? null : true;
    }

    supportedRestMethods(): Array<string>{
        return new Array('get','post','put','patch','delete','head','options');
    }
    setRequestMethod(method: string){
        if( this.supportedRestMethods().indexOf(method.toLowerCase()))
            this.restConfig.httpMethod = method;
    }

    getData(){
        console.log(this.restConfig);
    }

    /**
     * @function
     * @desc returns a JSON representation of the current Widget Object
     */
    toJson():WidgetConfig{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Object specific logic

        return json;
    }
    /**
     * @function
     * @desc handles creating any child widget components
     */
    parseWidgetConfig(config?: WidgetConfig){
        //Allows configuration to be set outside of OnInit.
        if(config) this.widgetConfig = config;

        //Do nothing if no widget config was provided
        if(!this.widgetConfig)
            return;

        //First let the base class handle all common areas
        super.parseWidgetConfig(this.widgetConfig);

        //now perform processes specific to this object

    }

    /**
     * @function
     * @description calls the base class to handle removal action
     */
    ngOnDestroy():void{
        super.ngOnDestroy();
    }
}

export interface RestConfig{
    httpMethod?: {};             //GET, PUT, POST, DELETE, OPTIONS...
    host?: string;               //URL
    path?: string;               //"url/path"
}