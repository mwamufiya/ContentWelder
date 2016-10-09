import { Component, OnInit, ViewChild, EventEmitter, ComponentFactoryResolver, ComponentFactory, 
    ComponentRef, EmbeddedViewRef, TemplateRef, ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import {Widget} from './widget.component'
import {DesignerDroppable} from '../directives/designer-droppable.directive';
import { Compiler} from '@angular/core';
import {WidgetFactory} from './widget-factory';
import {TextWidget} from './text-widget.component';
import {ImageWidget} from './image-widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';

@Component({
  selector: 'designer-stage',
  templateUrl: './app/components/designer-stage.component.html',
  styleUrls: ['./app/components/designer-stage.component.css'],
  entryComponents: [TextWidget, ImageWidget]
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
    addObject(event: any){
        alert('hello');
        console.log(event);
        //this.viewContainer.createEmbeddedView(this.vcr.createComponent(new TextWidget()));
    }

    childModified(widgetJSON){       
        //let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextWidget);
        let widgetConfig = widgetJSON.widgetConfig;
        console.log(widgetConfig);
        console.log(`++++++++++++++++++++`);
        let componentFactory = new WidgetFactory().createWidget(this.componentFactoryResolver, widgetConfig.type);
        console.log(`------------------------`);
        console.log(componentFactory);
        let ref = this.container.createComponent(componentFactory);
        
        super.addChild(ref, widgetConfig);
        //super.addChildViaJSON(widgetJSON.widgetConfig);
    }
    childActionInitiated(event){
        super.removeChild(event);
    }

}