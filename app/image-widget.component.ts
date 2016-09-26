import { Component, OnInit, TemplateRef, HostListener,
    ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from './make-draggable.directive'
import { Widget } from './widget.component'
import { DesignerDroppable } from './designer-droppable.directive'
import {WidgetFactory} from './widget-factory';


@Component({
  selector: 'designer-ImageWidget',
  templateUrl: 'app/image-widget.component.html',
  styles:[`
    img[src='']{
        border: 1px dotted yellow;
        background-image: url("http://placehold.it/350x150");
        width:350px;
        height:150px;
    }
    .activeWidget img{
        border:30px double orange;
    }
  `]
})
export class ImageWidget extends Widget{
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    constructor(
        componentFactoryResolver:ComponentFactoryResolver,
        viewContainer:ViewContainerRef){
        super(componentFactoryResolver, viewContainer);
        this.name = 'helloWorld';
    }

    @HostListener('click', ['$event']) onclick(event){
        super.onclick(event);
    }
}