import { Component, OnInit, TemplateRef, HostListener,
    ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
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
    div{
        border: 2px dotted red;
        background:white;
        padding:1em;
        resize:both;
    }
  `]
})
export class TextWidget extends Widget{
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, designerGlobals);
        this.name = 'helloWorld';
    }

    @HostListener('click') onclick(){
        console.log('you clicked something');
    }    
    
    childModified(widgetJSON):void {
        /*let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextWidget);
        let ref = this.container.createComponent(componentFactory);*/
        //console.clear();
        console.log(`----------------`)
        console.log(widgetJSON.insertionPoint);
        let componentFactory = new WidgetFactory().createWidget(this.viewContainer,this.componentFactoryResolver, widgetJSON);
        console.log(widgetJSON.insertionPoint);
        let ref = this.container.createComponent(componentFactory,widgetJSON.insertionPoint);
        
        super.addChild(ref);
        console.log(super.getChildren().length);
        console.log(this.container.length);
        
    }
}