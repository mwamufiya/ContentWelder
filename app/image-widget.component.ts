import { Component, OnInit, TemplateRef, HostListener,
    ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from './make-draggable.directive'
import { Widget } from './widget.component'
import { DesignerDroppable } from './designer-droppable.directive'
import {WidgetFactory} from './widget-factory';
import { DesignerGlobalsService } from './designer-globals.service';

@Component({
  selector: 'designer-ImageWidget',
  templateUrl: 'app/image-widget.component.html',
  styles:[`
    img[src='']{
        border: 1px dotted yellow;
        background-image: url("http://placehold.it/140x100");
        width:100px;
        height:100px;
    }
    .widgetContainer{
        display:inline-block;
        /*temporary until actual image loading and resizing workds*/
        width:140px;
        height:100px;
    }
  `]
})
export class ImageWidget extends Widget{
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, designerGlobals);
    }

    @HostListener('click', ['$event']) onclick(event){
        return super.onclick(event);
    }
    removeSelf(event){
        super.removeSelf(event);
    }
    ngOnDestroy(){
        super.ngOnDestroy();
    }        
}