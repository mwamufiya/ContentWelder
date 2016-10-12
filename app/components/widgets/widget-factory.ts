import { ComponentFactoryResolver,
    ComponentFactory} from '@angular/core';
    import { Widget } from './widget.component';
    import { BoxWidget } from './box.component';
    import { ImageWidget } from './image.component';
    import { VideoWidget } from './video.component';
    import { TextboxWidget } from './textbox.component';

    export class WidgetFactory{
        //TODO: make the WidgetJson an interface so that the definition is known and can be used in IDE
        //Might have to make it an Object, couldn't figure out a way to export an Interface for re-use
        createWidget(
            componentFactoryResolver: ComponentFactoryResolver,
            componentType:string):ComponentFactory<Widget>{
            
            //Store the list of string to Object for later use
            let factoryMap = {
                image: ImageWidget,
                video: VideoWidget,
                box: BoxWidget,
                textbox: TextboxWidget
            }

            componentType = componentType.toLowerCase();
            if(!factoryMap[componentType])
                return;

            let componentFactory = componentFactoryResolver.resolveComponentFactory(factoryMap[componentType]) as ComponentFactory<Widget>;
            return componentFactory;
        }
    }