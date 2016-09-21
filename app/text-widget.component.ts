import { Component, OnInit, TemplateRef, HostListener,
    ComponentFactoryResolver, ViewContainerRef, AfterViewInit } from '@angular/core';
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
        padding:2em;
        resize:both;
    }
  `]
})
export class TextWidget extends Widget{


    constructor(
        private compResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef){
        super(compResolver, viewContainer);
        this.name = 'helloWorld';
    }

    @HostListener('click') onclick(){
        //TODO
    }
    
    childModified(event):void {
        this.childWidgets.push(JSON.parse('{}'));
    }
}