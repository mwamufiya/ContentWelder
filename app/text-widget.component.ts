import { Component, OnInit, TemplateRef, HostListener, ChangeDetectorRef,
    ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from './make-draggable.directive'
import { Widget } from './widget.component'
import { DesignerDroppable } from './designer-droppable.directive'
import {WidgetFactory} from './widget-factory';
import { DesignerGlobalsService } from './designer-globals.service';

@Component({
  selector: 'designer-TextWidget',
  templateUrl: 'app/text-widget.component.html',
  styles:[`
    div[data-widgetType="textbox"]:blank, div[data-widgetType="textbox"]:-moz-only-whitespace{
       
    }
    div[data-widgetType="textbox"]{
        
    }
    .emptyContainer{
        min-height:50px;
    }
  `]
})
export class TextWidget extends Widget{
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
    }

    @HostListener('click', ['$event']) onclick(event){
        return super.onclick(event);
    }    
    
    childModified(widgetJSON):void {

        //console.log(widgetJSON.insertionPoint);
        let widgetConfig = widgetJSON.widgetConfig;
        let componentFactory = new WidgetFactory().createWidget(this.viewContainer,this.componentFactoryResolver, widgetConfig);
        let ref = this.container.createComponent(componentFactory,widgetJSON.insertionPoint);
        
        super.addChild(ref, widgetConfig );
        /*console.log(super.getChildren().length);
        console.log(this.container.length);*/
        
    }
    childActionInitiated(event){
        super.removeChild(event);
    }
}