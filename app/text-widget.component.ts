import { Component, OnInit, TemplateRef, HostListener,
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
        background:white;
    }
  `],
  outputs: ['parentActionReq']
})
export class TextWidget extends Widget{
    parentActionReq: EventEmitter<any>;
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, designerGlobals);
        this.parentActionReq = new EventEmitter();
    }

    @HostListener('click', ['$event']) onclick(event){
        console.log('you were clicked!!');
        return super.onclick(event);
    }    
    
    childModified(widgetJSON):void {
        /*let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextWidget);
        let ref = this.container.createComponent(componentFactory);*/
        //console.clear();
        /*console.log(`----------------`)
        console.log(widgetJSON.insertionPoint);*/
        let componentFactory = new WidgetFactory().createWidget(this.viewContainer,this.componentFactoryResolver, widgetJSON);
        let ref = this.container.createComponent(componentFactory,widgetJSON.insertionPoint);
        
        super.addChild(ref, widgetJSON.widgetConfig);
        /*console.log(super.getChildren().length);
        console.log(this.container.length);*/
        
    }
    removeSelf(event){
        console.log(`******INSIDE TEXT WIDGET*******`)
        console.log(event);
        //super.removeSelf(event);
        this.parentActionReq.emit({type:"delete"});
    }
    ngOnDestroy(){
        super.ngOnDestroy();
    } 
    childActionInitiated(event){
        super.removeChild(event);
    }
}