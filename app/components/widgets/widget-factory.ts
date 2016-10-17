import { ComponentFactoryResolver, ComponentFactory, ReflectiveInjector} from '@angular/core';
import { Widget } from './widget.component';
import { BoxWidget } from './box.component';
import { ImageWidget } from './image.component';
import { VideoWidget } from './video.component';
import { TextboxWidget } from './textbox.component';
import { PageWidget  } from './page.component';
import { WidgetConfig } from '../../interfaces/widgetJSON.interface';
import { DesignerToolsMenu} from '../designer-tools-menu.component';

export class WidgetFactory{
    //Returns the WidgetConfig for the provided Component
    //TODO the parameter being passed should be "typed" defined to avoid confusion down the line
    //INPUT: component                  supported: DesignterToolsMenu | Widget 
    getWidgetConfigFromComponent(component):WidgetConfig{
        let config:WidgetConfig;
        switch(component.constructor.name){
            case "DesignerToolsMenu":
                config = (component as DesignerToolsMenu).widgetConfig as WidgetConfig;
                break;
            case "Widget":
                break;
        }
        return config;
    }
    //Creates a ComponentFactory based on the provided componentType
    getWidgetFactory(compFactoryResolver: ComponentFactoryResolver,
        componentType:string):ComponentFactory<Widget>{
       
       componentType = componentType.toLowerCase();

        //Store the list of string to Object for later use
        let factoryMap = {
            image: ImageWidget,
            video: VideoWidget,
            box: BoxWidget,
            textbox: TextboxWidget,
            page: PageWidget
        }
        
        if(!factoryMap[componentType])
            return;

        let componentFactory = compFactoryResolver.resolveComponentFactory(factoryMap[componentType]);
        return componentFactory as ComponentFactory<Widget>;
    }
}