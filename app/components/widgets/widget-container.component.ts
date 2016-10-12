import { Component, ViewChild, ComponentFactoryResolver, ClassDefinition,
    ComponentFactory, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';

import { Widget } from './widget.component';
import { DesignerToolsMenu} from '../designer-tools-menu.component'
import { WidgetFactory} from './widget-factory';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { WidgetDrop } from '../../interfaces/widget-drop.interface'
import { WidgetConfig } from '../../interfaces/widgetJSON.interface';

/*****Entry Components****** */
import { BoxWidget} from './box.component';
import { ImageWidget } from './image.component';
import { VideoWidget} from './video.component';
import { TextboxWidget } from './textbox.component';

export class WidgetContainer extends Widget{
    container:ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainer: ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService,
        private router: Router){
            super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
    }

    childModified(event:WidgetDrop){     
        //Loop through all items being added and add.
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
            this.designerGlobals.setSelectedComponent(ref.instance, event.items.length? true : false);
            super.addChild(ref, widgetConfig);
        }
    }

}