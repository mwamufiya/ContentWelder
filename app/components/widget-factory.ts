import { Component,
    ComponentFactoryResolver,
    ComponentFactory, 
    ComponentRef} from '@angular/core';
    import {Widget} from './widget.component';
    import {TextWidget} from './text-widget.component';
    import {ImageWidget} from './image-widget.component';
    import {VideoWidget} from './video-widget.component';

    export class WidgetFactory{
        //TODO: make the WidgetJson an interface so that the definition is known and can be used in IDE
        //Might have to make it an Object, couldn't figure out a way to export an Interface for re-use
        createWidget(
            componentFactoryResolver: ComponentFactoryResolver,
            componentType:string):ComponentFactory<Widget>{

            let componentFactory;
            switch(componentType.toLocaleLowerCase()){
                case "textbox":
                    componentFactory = componentFactoryResolver.resolveComponentFactory(TextWidget);
                    break;
                case "image":
                    componentFactory = componentFactoryResolver.resolveComponentFactory(ImageWidget);
                    break;
                case "video":
                    componentFactory = componentFactoryResolver.resolveComponentFactory(VideoWidget);
                    break;
                default:
            }
            return componentFactory;
        }
    }