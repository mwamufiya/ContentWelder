import { Directive, 
    ElementRef, 
    Input, 
    HostListener, OnInit, EventEmitter, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import {WidgetFactory} from './widget-factory';

@Directive({
    selector: '[widgetFactory]',
    inputs: ['widgetConfig']
})

export class WidgetTemplateFactory implements OnInit{
    widgetConfig:JSON;

    constructor( private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainerRef:ViewContainerRef){

    }
    ngOnInit(){
        this.widgetConfig = this.widgetConfig;
        let componentFactory = new WidgetFactory().createWidget(this.viewContainerRef,this.componentFactoryResolver, this.widgetConfig);
        return this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
    }
}

