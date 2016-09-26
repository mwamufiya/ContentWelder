import { Component,
    ComponentFactoryResolver,
    ComponentFactory, 
    ComponentRef,
    ViewContainerRef} from '@angular/core';
    import {Widget} from './widget';
    import {TextWidget} from './text-widget.component';
    import {ImageWidget} from './image-widget.component';

    export class WidgetFactory{
        createWidget(
            viewContainer:ViewContainerRef,
            componentFactoryResolver: ComponentFactoryResolver,
            widgetType:string,
            config:JSON):ComponentFactory<Widget>{
            let componentFactory;
            switch(widgetType){
                case "textbox":
                    componentFactory = componentFactoryResolver.resolveComponentFactory(TextWidget);
                    break;
                case "image":
                    componentFactory = componentFactoryResolver.resolveComponentFactory(ImageWidget);
                    break;
                default:
            }
            return componentFactory;
        }
    }