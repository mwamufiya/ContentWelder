import { ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef, ViewRef, Component} from '@angular/core';
import { Widget } from './widget.component';
import { BoxWidget } from './widget-box.component';
import { ImageWidget } from './widget-image.component';
import { VideoWidget } from './widget-video.component';
import { TextboxWidget } from './widget-textbox.component';
import { PageWidget  } from './widget-page.component';
import { FormWidget  } from './widget-form.component';
import { WidgetConfig} from './widget.interface';
import { DesignerToolsMenu} from '../designer/designer-tools-menu.component';

export class WidgetFactory{
    /**
     * @function
     * @param {DesignerToolsMenu | Widget} component
     * @returns {ComponentRef}
     * @description Determine what type of component to create based on the provided 'Component' and returns a Component Ref
     */
    addWidget(ftyResolver: ComponentFactoryResolver,
        viewCont: ViewContainerRef,
        component: Object,
        instIndex?: number):{compRef: ComponentRef<Widget>, config?: WidgetConfig}
    {
        let viewRef:ViewRef;
        let compRef: ComponentRef<Widget>;

        let config = this.getWidgetConfigFromComponent(component);

                //if this is a widget then we don't need to create a new one
        //TODO find a better way of determining if this is a widget or not.
        let fty = this.getWidgetFactory(ftyResolver, config.widgetType);

        //If an index was provided, we insert the created component at the desired location.
        //Because teh ViewContainer.Move only works for embedded views, we need to create brand new components
        if (instIndex)
            compRef = viewCont.createComponent(fty, instIndex);
        else
            compRef = viewCont.createComponent(fty);

        //Store the hostview in the widget for future reference, since Angular doesn't yet offer an easy means of retrieving this after creation
        //compRef.instance.setHostView(compRef.instance.hostView);

        //If this is an existing Widget, additional actions are neccessary
        //1. get the widgetConfig
        //2. Delete the dropped items
        //3. pass widgetconfig to the new component
        if((component as Widget).widgetType) {
            //Get the JSon configure
            let c = component as Widget;
            compRef.instance.parseWidgetConfig(c.toJson());
            c.removeSelf();
        }

        return {
            compRef: compRef,
            config: config
        };
    }

    /**
     * @function
     * @param {DesignerToolsMenus | Widget} component
     * @returns {WidgetConfig}
     * @description Returns the WidgetConfig for the provided Component
     */
    getWidgetConfigFromComponent(component):WidgetConfig{
        let config:WidgetConfig;

        let factoryMap = this.getFactoryMap();

        //If the component doesn't exist in in our factory map then it is a DesignerToolsMenu items
        //this may need to change if support for non widgets is added.
        if(!factoryMap[component.constructor.name.toLowerCase()]){
            config = (component as DesignerToolsMenu).widgetConfig as WidgetConfig;
        }else
            config = {widgetType: component.constructor.name}

        return config;
    }

    /**
     * @function
     * @param {ComponentFactoryResolver} compFactoryResolver
     * @param {string} widgetType
     * @returns {ComponentFactory<Widget>}
     * @description creates a component factory based on the widgetType
     */
    //Creates a ComponentFactory based on the provided componentType
    getWidgetFactory(compFactoryResolver: ComponentFactoryResolver,
        widgetType:string):ComponentFactory<Widget>{
       
       widgetType = widgetType.toLowerCase();

        //Store the list of string to Object for later use
        let factoryMap = this.getFactoryMap();
        
        if(!factoryMap[widgetType])
            return;

        let componentFactory = compFactoryResolver.resolveComponentFactory(factoryMap[widgetType]);
        return componentFactory as ComponentFactory<Widget>;
    }

    /**
     * @function
     * @returns {{imagewidget: ImageWidget, videowidget: VideoWidget, boxwidget: BoxWidget, textboxwidget: TextboxWidget, pagewidget: PageWidget, formwidget: FormWidget}}
     * @description returns the definitive list of Widgets currently supported by this factory
     */
    getFactoryMap(){
        return {
            imagewidget: ImageWidget,
            videowidget: VideoWidget,
            boxwidget: BoxWidget,
            textboxwidget: TextboxWidget,
            pagewidget: PageWidget,
            formwidget: FormWidget
        };
    }
}