import { Component, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, OnInit,
    ViewChild, forwardRef, HostListener, OnDestroy } from '@angular/core';

import { DataViewBuilder_I, BuilderConfig } from './dataview-builder.interface';
import { DataViewBuilderService } from './dataview-builder.services';

/**
 * @interface
 * @description used to allow communication between the Display and the Data retrieval
 */
export interface RestDataViewBuilder_I extends BuilderConfig{
    httpMethod: string;             //GET, PUT, POST, DELETE, OPTIONS...
    host: string;               //URL
    path: string;               //"url/path"
    headers: Array<{name:string,value:string}>;
    params: Array<{name:string,value:string}>;
}

@Component({
    moduleId: module.id,
    selector: 'dataviewbuilder-rest',
    templateUrl: 'dataview-builder-rest.component.html',
    styleUrls: ['dataview-builder-rest.component.css'],
    inputs: ['builderConfig']
})

export class RestDataViewBuilder implements DataViewBuilder_I, RestDataViewBuilder_I, OnInit{
    builderType:string = 'rest';
    builderConfig: BuilderConfig;
    //settings: RestBuilderConfig;
    prvData: JSON;
    httpMethod:string;
    defaultHttpMethod:string = 'get';
    host:string;
    path:string;
    headers:Array<{name:string, value:string}> = new Array<{name:string,value:string}>();
    params: Array<{name:string,value:string}> = new Array<{name:string,value:string}>();
    loadingData:boolean = false;
    listInputContext:string;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        private dataService: DataViewBuilderService){

    }

    /**
     * @function
     * @description since Input values are set onInit, if the value is not provided, we initialize it.
     */
    ngOnInit():void {
        if (!this.builderConfig){
            this.setDefaults();
        }else{
            this.parseConfig(this.builderConfig);
        }
    }

    /**
     * @function
     * @description sets default values for the most common use
     */
    setDefaults():void{
        this.httpMethod = this.defaultHttpMethod;
        this.headers = [{name: 'content-type', value:'application/json'}];
    }

    supportedRestMethods(): Array<string>{
        return new Array('get','post','put','patch','delete','head','options');
    }

    /**
     * @function
     * @param {string} val
     * @description allows the Template to toggle between various tabs based on what context is active
     */
    setListContext(val:string):void{
        this.listInputContext = val;
    }

    /**
     * @function
     * @description adds a new header to the header list
     */
    addHeader():void{
        if(!this.headers)
            this.headers = []

        this.headers.push({name:'', value:''});
    }

    /**
     * @function
     * @description remove the requested header
     */
    removeHeader(index: number): void{
        this.headers.splice(index, 1);
    }

    /**
     * @function
     * @description adds a new parameter to the params list
     */
    addParams():void{
        if(!this.params)
            this.params = []

        this.params.push({name:'', value:''});
    }

    /**
     * @function
     * @description remove the requested parameter
     */
    removeParams(index: number): void{
        this.params.splice(index, 1);
    }

    /**
     * @function
     * @description remove empty values from the Headers and params
     */
    cleanseUserInputLists(){
        let newList = new Array<{name:string,value:string}>();
        for(let i=0; i< this.headers.length; i++){
            let item = this.headers[i];
            if(item.value.length && item.name.length)
                newList.push({name: item.name, value: item.value})
        }
        this.headers = newList;

        newList = new Array<{name:string,value:string}>();
        for(let i=0; i< this.params.length; i++){
            let item = this.params[i];
            if(item.value.length && item.name.length)
                newList.push({name: item.name, value: item.value})
        }
        this.params = newList;
    }
    /**
     * @function
     * @description Makes a request for the data and provides a preview
     */
    previewData(){
        this.cleanseUserInputLists();

        //clear out existing data
        this.loadingData = true;
        this.prvData = null;
        //let json = this.toJson();
        this.dataService.fetch('rest', this.toJson())
            .then( json => {
                this.displayPreview(json);
            })
            .catch( response => {
                //TODO handle error
            });
    }

    displayPreview(json:JSON){
        this.loadingData = false;
        this.prvData = json;
    }

    /**
     * @function
     * @desc returns a JSON representation of the current Widget Object
     */
    toJson():RestDataViewBuilder_I{

        let json: RestDataViewBuilder_I = {
            builderType: this.builderType,
            httpMethod: this.httpMethod,
            host: this.host,
            path: this.path,
            headers: this.headers,
            params: this.params
        };

        return json;
    }
    /**
     * @function
     * @desc handles creating any child widget components
     */
    parseConfig(config?: BuilderConfig){
        //Allows configuration to be set outside of OnInit.
        if(!config)
            return;

        this.httpMethod = config['httpMethod'];
        this.host = config['host'];
        this.path = config['path'];
        this.headers = config['headers'];

    }
    getContentTypes(){
        return [
            `application/json`,
            `application/xml`,
            `application/atom+xml`,
            `multipart/form-data`,
            `multipart/alternative`,
            `multipart/mixed`,
            `application/x-www-form-urlencoded`,
            `application/base64`,
            `application/octet-stream`,
            `text/aplin`,
            `text/css`,
            `text/html`,
            `application/javascript`
        ];
    }
}