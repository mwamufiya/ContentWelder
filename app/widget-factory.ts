import { Component,
    ComponentFactoryResolver,
    ComponentFactory, 
    ComponentRef,
    ViewContainerRef} from '@angular/core';
    import {Widget} from './widget';
    import {TextWidget} from './text-widget.component';
    import {ImageWidget} from './image-widget.component';

    export class WidgetFactory{
        //TODO: make the WidgetJson user an interface so that the definition is known and can be used in IDE
        createWidget(
            viewContainer:ViewContainerRef,
            componentFactoryResolver: ComponentFactoryResolver,
            widgetJson:any):ComponentFactory<Widget>{

            let componentFactory;
            switch(widgetJson.widgetConfig.type){
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