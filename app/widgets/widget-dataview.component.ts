import { Component, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef,
    ViewChild, forwardRef, HostListener, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Widget  } from './widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Parent } from './parent';
import { WidgetConfig } from './widget.interface';
import { BuilderConfig } from './dataview-builder/dataview-builder.interface';
import { DataViewBuilderService } from './dataview-builder/dataview-builder.services';

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
    dispBuilderConfig:boolean;
    dataBuilerConfig: BuilderConfig;
    loadingData:boolean;            //Indicator for when data is being requested over HTTP
    dataList:JSON;           //Stores data returned from server

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private dataBuilderService: DataViewBuilderService,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){

        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);

    }

    /**
     * function
     * @param {Event} event
     * @returns {boolean}
     * @description Handles the click action
     */
    @HostListener('click', ['$event']) onclick(event: Event):boolean{
        return super.onclick(event);
    }

    /**
     * @function
     * @description toggles the settings screen
     */
    toggleSettings():void{
        this.dispBuilderConfig = (this.dispBuilderConfig==true)? null : true;
    }

    /**
     * @function
     * @param {BuilderConfig} data
     * @description sets the current
     */
    setBuilderConfig(config: BuilderConfig):void{
        this.dataBuilerConfig = config;
    }

    /**
     * @function
     * @param {BuilderConfig} data
     * @description
     *
     */
    displayData(config:BuilderConfig):void{
        this.setBuilderConfig(config);
        this.fetchData();                                       //Make Call to get data
    }

    /**
     * @function
     * @description fetches data.
     */
    fetchData():void{
        this.dispBuilderConfig = null;                          //hide the builder config as the user is done now
        this.loadingData = true;                                //Allow the UI to display any 'loading' based on this
        this.dataList = null;                                   //Clear out the existing Data list in preparation for new data
        this.dataBuilderService.fetch(this.dataBuilerConfig)    //Fetch the data
            .then( json => {
                this.loadingData = false;
                this.dataList = json;
            })
            .catch( response => {
                //TODO handle error
            });
    }

    /**
     * @function
     * @desc returns a JSON representation of the current Widget Object
     */
    toJson():WidgetConfig{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Object specific logic
        json['dataBuilerConfig'] = this.dataBuilerConfig;

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
        if(this.widgetConfig['dataBuilerConfig']) {
            this.dataBuilerConfig = this.widgetConfig['dataBuilderConfig'];
            this.fetchData();

        }

    }

    /**
     * @function
     * @description calls the base class to handle removal action
     */
    ngOnDestroy():void{
        super.ngOnDestroy();
    }
}