import { Component,
    OnInit,
    ViewChild,
    EventEmitter,
    ComponentFactoryResolver,
    ComponentFactory, 
    ComponentRef,
    EmbeddedViewRef,
    TemplateRef,
    ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import {Widget} from './widget.component'
import {DesignerDroppable} from './designer-droppable.directive';
import { Compiler} from '@angular/core';
import {WidgetFactory} from './widget-factory';
import {TextWidget} from './text-widget.component';
import {ImageWidget} from './image-widget.component';
import { DesignerGlobalsService } from './designer-globals.service';

@Component({
  selector: 'designer-stage',
  templateUrl: 'app/designer-stage.component.html',
  styleUrls: ['app/designer-stage.component.css'],
  entryComponents: [TextWidget, ImageWidget]
})
export class DesignerStageComponent extends Widget{
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    childWidgets:Array<JSON>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainer: ViewContainerRef,
        designerGlobals: DesignerGlobalsService,
        private router: Router){
            super(componentFactoryResolver, viewContainer, designerGlobals);
    }
    addObject(event: any){
        alert('hello');
        console.log(event);
        //this.viewContainer.createEmbeddedView(this.vcr.createComponent(new TextWidget()));
    }

    childModified(widgetJSON){       
        //let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextWidget);
        let widgetConfig = widgetJSON.widgetConfig;
        let componentFactory = new WidgetFactory().createWidget(this.viewContainer,this.componentFactoryResolver, widgetConfig);
        let ref = this.container.createComponent(componentFactory);
        
        super.addChild(ref, widgetConfig);
        //super.addChildViaJSON(widgetJSON.widgetConfig);
    }
    childActionInitiated(event){
        console.log(`*************`)
        console.log(event);
        super.removeChild(event);
    }

}