import { Component, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef} from '@angular/core';

import { Widget } from './widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { WidgetConfig, WidgetDrop } from './widget.interface';
import { WidgetFactory} from './widget-factory';

@Component({
  selector: 'designer-widgetContainer',
  template: `<!-- Widget Containers are not meant to be used -->`
})

export class WidgetContainer extends Widget{
    container:ViewContainerRef;
    
    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainer: ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
            super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
    }

    childModified(event:WidgetDrop){
        //Loop through all items being added and add.
        let index:number = 0;
        let fty = new WidgetFactory();
        for(let item of event.items){

            let output= fty.addWidget(this.componentResolver, this.container, item, event.insertionPoint);

            //if this item is the first in the array, do not append it. otherwise, we do;
            this.designerGlobals.setSelectedComponent(output.compRef.instance, index == 0? false : true);
            this.addChild(output.compRef, output.config);

            index++;
        }
    }

}