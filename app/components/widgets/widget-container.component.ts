import { Component, ViewChild, ComponentFactoryResolver, ClassDefinition,
    ComponentFactory, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';

import { Widget } from './widget.component';
import { DesignerToolsMenu} from '../designer-tools-menu.component';
import { WidgetFactory} from './widget-factory';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { WidgetDrop } from '../../interfaces/widget-drop.interface';
import { WidgetConfig } from '../../interfaces/widgetJSON.interface';

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