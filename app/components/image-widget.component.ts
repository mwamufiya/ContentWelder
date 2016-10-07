import { Component, OnInit, TemplateRef, HostListener, ChangeDetectorRef, ChangeDetectionStrategy,
    ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from '../directives/make-draggable.directive'
import { Widget } from './widget.component'
import { DesignerDroppable } from '../directives/designer-droppable.directive'
import {WidgetFactory} from './widget-factory';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { SemanticModalComponent } from 'ng-semantic';

@Component({
  selector: 'designer-ImageWidget',
  templateUrl: './app/components/image-widget.component.html',
  styles:[`
    img{
        height:100%;
        width:100%;
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
    defaultImgUrl:string = `http://placehold.it/140x100`;
    imgPath:string = this.defaultImgUrl;

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
}