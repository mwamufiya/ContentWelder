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
import { Subscription } from 'rxjs/Subscription';

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
    isSelected: boolean;

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
      event.stopPropagation();
      this.designerGlobals.setSelectedComponent(this, event.shiftKey? true : null);
      return false;
    }
    
    getChildren():Array<ComponentRef<any>>{
      return this.children;
    }
    addChild(child:ComponentRef<any>){
      this.children.push(child);
    }
    checkIfCurrentlySelected(selectedArray:Array<Widget>){
      //if this item exists in the list of currently selected items, mark it as such.
      this.isSelected = selectedArray.indexOf(this) != -1? true: false;
    }
    displayError(err:any){
      console.log(err);
    }

    ngOnDestroy(){
      this._selectedItemSubscription.unsubscribe();
    }
}