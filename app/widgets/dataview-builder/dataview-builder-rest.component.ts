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
    headers: Array<{headerName:string,headerValue:string}>;
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
    headers:Array<{headerName:string, headerValue:string}>

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
            this.httpMethod = this.defaultHttpMethod;
        }else{
            this.parseConfig(this.builderConfig);
        }
    }

    supportedRestMethods(): Array<string>{
        return new Array('get','post','put','patch','delete','head','options');
    }
    setRequestMethod(method: string){
        if( this.supportedRestMethods().indexOf(method.toLowerCase()))
            this.httpMethod = method;
    }

    /**
     * @function
     * @description adds a new header to the header list
     */
    addHeader():void{
        if(!this.headers)
            this.headers = []

        this.headers.push({headerName:'', headerValue:''});
    }

    /**
     * @function
     * @description Makes a request for the data and provides a preview
     */
    previewData(){
        //clear out existing data
        this.prvData = null;
        //let json = this.toJson();
        this.dataService.fetch('rest', this.toJson()).then( json => {
            this.displayPreview(json);
        });
    }

    displayPreview(json:JSON){
        this.prvData = json;
    }

    /**
     * @function
     * @desc returns a JSON representation of the current Widget Object
     */
    toJson():BuilderConfig{

        let json: BuilderConfig = {
            builderType: this.builderType,
            httpMethod: this.httpMethod,
            host: this.host,
            path: this.path,
            headers: this.headers
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