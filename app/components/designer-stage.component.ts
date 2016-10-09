import { Component, ViewChild, ComponentFactoryResolver, 
    ComponentFactory, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import {Widget} from './widgets/widget.component'
import {WidgetFactory} from './widgets/widget-factory';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { BoxWidget} from './widgets/box.component';
import { ImageWidget } from './widgets/image.component';
import { VideoWidget} from './widgets/video.component';

@Component({
  selector: 'designer-stage',
  templateUrl: './app/components/designer-stage.component.html',
  styleUrls: ['./app/components/designer-stage.component.css'],
  entryComponents: [BoxWidget, ImageWidget, VideoWidget]
})
export class DesignerStageComponent extends Widget{
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    childWidgets:Array<JSON>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainer: ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService,
        private router: Router){
            super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
    }

    childModified(widgetJSON){       
        let widgetConfig = widgetJSON.widgetConfig;
        let componentFactory = new WidgetFactory().createWidget(this.componentFactoryResolver, widgetConfig.type);
        let ref = this.container.createComponent(componentFactory);
        
        //Mark this item as selected.
        this.designerGlobals.setSelectedComponent(ref.instance);
        super.addChild(ref, widgetConfig);
    }
    childActionInitiated(event){
        super.removeChild(event);
    }



}