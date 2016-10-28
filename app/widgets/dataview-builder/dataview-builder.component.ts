/**
 * Created by mwamu on 10/28/2016.
 */
import { Component, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef,
    ViewChild, OnInit, forwardRef, HostListener, OnDestroy } from '@angular/core';

import { BuilderConfig, DataViewBuilder_I } from './dataview-builder.interface';
import { RestDataViewBuilder } from './dataview-builder-rest.component';

@Component({
    moduleId: module.id,
    selector: 'dataviewbuilder',
    templateUrl: 'dataview-builder.component.html',
    styleUrls: ['dataview-builder.component.css'],
    inputs: ['builderConfig'],
    entryComponents: [RestDataViewBuilder]
})

export class DataViewBuilder implements  DataViewBuilder_I, OnInit{
    @ViewChild('databuilder')
    widgetType:string;
    builderConfig: BuilderConfig;
    dataProviders:Array<any>;
    dataProvider:string;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef){
    }

    ngOnInit(){
        this.dataProviders = this.getDataProviders();
    }


    /**
     * @function
     * @desc returns a JSON representation of the current Object
     */
    toJson():BuilderConfig{

        //TODO add logic to export out.
        return null
    }
    /**
     * @function
     * @description handles any additional logic neccessary to load the appropriate view Builder
     */
    parseConfig(config?: BuilderConfig){
        //Allows configuration to be set outside of OnInit.
        if(config) this.builderConfig= config;

        //Do nothing if no widget config was provided
        if(!this.builderConfig)
            return;

        //TODO add any additional logic if neccessary
    }

    /**
     * @function
     * @param {string} value
     * @description sets this.dataProvider = value If it is 'active' provider. as defined by 'isActive'
     */
    setProvider(reqProvider:string):void{
        let providerList = this.getDataProviders();
        let provider;
        for(let i=0; i<providerList.length; i++){
            if(providerList[i].name == reqProvider) {
                provider = providerList[i];
                break;
            }
        }

        if(provider)
            this.dataProvider = provider.name;
    }

    /**
     * @function
     * @returns {{name: string, icon: string, isActive: boolean, value: string, desc: string}[]}
     * @description returns the list of supported DataViewProviders
     */
    getDataProviders():Array<any>{
        return [
            {
                label: "Rest",
                icon: `settings icon`,
                isActive: true,
                name: 'rest',
                img: ``,
                desc: `Build you rown report by hitting any site`
            },
            {
                label: "ContentWelder",
                icon: "",
                name: 'contentwelder',
                img: ``,
                desc: `Leverage your contentwelder`
            }            ,
            {
                label: "SalesForce",
                icon: "",
                name: 'salesforce',
                img: ``,
                desc: `Leverage your salesforce account`
            }
        ];
    }

}