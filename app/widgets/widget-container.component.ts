import { Component, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef} from '@angular/core';

import { Widget } from './widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';

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

}