import { Component, OnInit, TemplateRef, HostListener, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from './make-draggable.directive'
import { DesignerDroppable } from './designer-droppable.directive'


@Component({
  selector: '[widget]',
  templateUrl: 'widget.component.html',
  styles:[`
    :host{
        display: flex;
        border: 1px solid #CCC;
        border-radius:3px;
        padding:.25em;
    }
  `]
})
export class Widget {
    x:number;
    y:number;
    name:string;
    desc:string;
    opacity:number;
    layer:number;
    widgets:Array<Widget>;
    isActive:boolean = false;

    constructor(private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef){

        }

    @HostListener('click', ['$event']) onclick(event){
      this.viewContainer.element.nativeElement.classList.add('activeWidget');
      console.log('hello');
    }
}