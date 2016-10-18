import { ComponentFactoryResolver, ComponentFactory, ReflectiveInjector} from '@angular/core';
import { Widget } from './widget.component';
import { BoxWidget } from './widget-box.component';
import { ImageWidget } from './widget-image.component';
import { VideoWidget } from './widget-video.component';
import { TextboxWidget } from './widget-textbox.component';
import { PageWidget  } from './widget-page.component';
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
            default:
                config = {type: component.constructor.name}
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
            imagewidget: ImageWidget,
            videowidget: VideoWidget,
            boxwidget: BoxWidget,
            textboxwidget: TextboxWidget,
            pagewidget: PageWidget
        }
        
        if(!factoryMap[componentType])
            return;

        let componentFactory = compFactoryResolver.resolveComponentFactory(factoryMap[componentType]);
        return componentFactory as ComponentFactory<Widget>;
    }
}