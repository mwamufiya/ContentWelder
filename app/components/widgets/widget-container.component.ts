import { Component, ViewChild, ComponentFactoryResolver, ClassDefinition,
    ComponentFactory, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';

import { Widget } from './widget.component';
import { DesignerToolsMenu} from '../designer-tools-menu.component';
import { WidgetFactory} from './widget-factory';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { WidgetDrop } from '../../interfaces/widget-drop.interface';
import { WidgetConfig } from '../../interfaces/widgetJSON.interface';

export class WidgetContainer extends Widget{
    container:ViewContainerRef;
    
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainer: ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
            super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
    }

    childModified(event:WidgetDrop){     
        //Loop through all items being added and add.
        let index:number = 0;
        for(let item of event.items){
            //get the proper widgetType
            let widgetType:string;
            let widgetConfig:WidgetConfig;
            //get the widget Config based on the type of item being added.
            //TODO: this should probably be moved to some sort of factory.
            switch(item.constructor.name){
                case "DesignerToolsMenu":
                    widgetConfig = (item as DesignerToolsMenu).widgetConfig as WidgetConfig;
                    break;
                case "Widget":
                    break;
            }
            let componentFactory = new WidgetFactory().createWidget(this.componentFactoryResolver, widgetConfig.type);
            let ref = this.container.createComponent(componentFactory);

            //if this item is the first in the array, do not append it. otherwise, we do;
            this.designerGlobals.setSelectedComponent(ref.instance, index == 0? false : true);
            this.addChild(ref, widgetConfig);

            index++;
        }
    }

}