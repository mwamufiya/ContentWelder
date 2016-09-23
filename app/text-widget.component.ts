import { Component, OnInit, TemplateRef, HostListener,
    ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from './make-draggable.directive'
import { Widget } from './widget.component'
import { DesignerDroppable } from './designer-droppable.directive'


@Component({
  selector: 'designer-TextWidget',
  templateUrl: 'app/widget.component.html',
  styles:[`
    div{
        display: flex;
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
    
    childModified(event):void {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextWidget);
        let ref = this.container.createComponent(componentFactory);
        //console.log(ref);
        
        //this.childWidgets.push(JSON.parse('{}'));
    }
}