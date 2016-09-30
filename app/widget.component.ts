import { Component,
   OnInit,
   HostListener,
   ViewContainerRef,
   ViewChild,
   ComponentFactoryResolver, 
   AfterViewInit,
   ComponentRef, OnDestroy
      } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from './make-draggable.directive'
import { DesignerDroppable } from './designer-droppable.directive'
import { DesignerGlobalsService } from './designer-globals.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'designerWidget',
  templateUrl: 'app/widget.component.html',
  styles:[`
    :host{
        display: flex;
        border: 2px dotted red;
        padding:2em;
    }
  `]
})
export class Widget{
    //@ViewChild('placeholder', {read: ViewContainerRef}) placeholder;

    x:number;
    y:number;
    name:string;
    desc:string;
    opacity:number;
    layer:number;
    children:Array<ComponentRef<any>>;  //array of child widgets
    config:JSON;            //JSON configuration for the widget
    componentResolver:ComponentFactoryResolver;
    viewCont:ViewContainerRef;
    designerGlobals: DesignerGlobalsService;
    private _selectedItemSubscription: Subscription;

    constructor(
      componentResolver:ComponentFactoryResolver,
      viewCont:ViewContainerRef,
      designerGlobals: DesignerGlobalsService){
        this.componentResolver = componentResolver;
        this.viewCont = viewCont;
        this.designerGlobals = designerGlobals;
        this.children = new Array;

        //subscript to the locally selected item
        this._selectedItemSubscription = this.designerGlobals.getSelectedItemsObservable().subscribe(
          value => this.checkIfCurrentlySelected(value),
          err => this.displayError(`Error encountered when subscribing to observable`)
        );
    }

    childModified(event):void {
    }
    
    @HostListener('click', ['$event']) onclick(event){
      this.viewCont.element.nativeElement.classList.add('activeWidget');;
    }
    
    getChildren():Array<ComponentRef<any>>{
      return this.children;
    }
    addChild(child:ComponentRef<any>){
      this.children.push(child);
    }
    checkIfCurrentlySelected(value:any){
      console.log(value);
    }
    displayError(err:any){
      console.log(err);
    }

    ngOnDestroy(){
      this._selectedItemSubscription.unsubscribe();
    }
}