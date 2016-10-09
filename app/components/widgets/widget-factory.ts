import { Component,
    ComponentFactoryResolver,
    ComponentFactory, 
    ComponentRef} from '@angular/core';
    import {Widget} from './widget.component';
    import { BoxWidget} from './box.component';
    import {ImageWidget} from './image.component';
    import {VideoWidget} from './video.component';

    export class WidgetFactory{
        //TODO: make the WidgetJson an interface so that the definition is known and can be used in IDE
        //Might have to make it an Object, couldn't figure out a way to export an Interface for re-use
        createWidget(
            componentFactoryResolver: ComponentFactoryResolver,
            componentType:string):ComponentFactory<Widget>{

            let componentFactory;
            switch(componentType.toLocaleLowerCase()){
                case "image":
                    componentFactory = componentFactoryResolver.resolveComponentFactory(ImageWidget);
                    break;
                case "video":
                    componentFactory = componentFactoryResolver.resolveComponentFactory(VideoWidget);
                    break;
                case "box":
                    componentFactory = componentFactoryResolver.resolveComponentFactory(BoxWidget);
                    break;
                default:
            }
            return componentFactory;
        }
    }