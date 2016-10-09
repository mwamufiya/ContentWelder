import { Directive, 
    ElementRef, 
    Input, 
    HostListener, OnInit, EventEmitter, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import {WidgetFactory} from '../components/widget-factory';

@Directive({
    selector: '[widgetFactory]',
    inputs: ['widgetConfig']
})

export class WidgetTemplateFactory implements OnInit{
    widgetConfig:any;

    constructor( private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainerRef:ViewContainerRef){

    }
    ngOnInit(){
        this.widgetConfig = this.widgetConfig;
        let componentFactory = new WidgetFactory().createWidget(this.componentFactoryResolver, this.widgetConfig.type);
        return this.viewContainerRef.createComponent(componentFactory, 0, this.viewContainerRef.injector);
    }
}

