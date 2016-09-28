import { Component, OnInit, TemplateRef, HostListener,
    ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from './make-draggable.directive'
import { Widget } from './widget.component'
import { DesignerDroppable } from './designer-droppable.directive'
import {WidgetFactory} from './widget-factory';

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
        private viewContainer:ViewContainerRef){
        super(componentFactoryResolver, viewContainer);
        this.name = 'helloWorld';
    }

    @HostListener('click') onclick(){
        //TODO
    }
    
    childModified(widgetJSON):void {
        /*let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextWidget);
        let ref = this.container.createComponent(componentFactory);*/
        
        let componentFactory = new WidgetFactory().createWidget(this.viewContainer,this.componentFactoryResolver, widgetJSON);
        let ref = this.container.createComponent(componentFactory,0);
    
        //super.getChildren().push(ref);
    }
}