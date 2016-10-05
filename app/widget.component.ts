import { Component,
   OnInit,
   HostListener,
   ViewContainerRef,
   ViewChild,
   ComponentFactoryResolver, 
   AfterViewInit,
   ComponentRef, OnDestroy, EventEmitter, Output
      } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from './make-draggable.directive'
import { DesignerDroppable } from './designer-droppable.directive'
import { DesignerGlobalsService } from './designer-globals.service';
import { Subscription } from 'rxjs/Subscription';
import { WidgetComs } from './widgetJSON.interface';

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
    children:Array<Widget>;  //array of child widgets
    infants:Array<JSON>;     //JSON array of children.
    config:JSON;            //JSON configuration for the widget
    componentResolver:ComponentFactoryResolver;
    viewCont:ViewContainerRef;
    designerGlobals: DesignerGlobalsService;
    private _selectedItemSubscription: Subscription;
    isSelected: boolean;
    removeCurrent:boolean = false; //marked to true when current item is requested to be removed;
    parentActionReq: EventEmitter<any> = new EventEmitter();
    curCompRef:ComponentRef<Widget>;

    constructor(
      componentResolver:ComponentFactoryResolver,
      viewCont:ViewContainerRef,
      designerGlobals: DesignerGlobalsService){
        this.componentResolver = componentResolver;
        this.viewCont = viewCont;
        this.designerGlobals = designerGlobals;
        this.children = new Array;
        this.infants = new Array;

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
    
    getChildren():Array<Widget>{
      return this.children;
    }
    addChild(compRef:ComponentRef<Widget>, widgetJSON){
      //Because Dynamically created components cannot leverage angular's Input/Ouput, 
      //we must subscript to the EventEmitter manually
      compRef.instance.parentActionReq.subscribe(compRef => this.removeChild(compRef));
      //Set the ComponentRef for use down the line.
      compRef.instance.curCompRef = compRef;

      //Add the the item to our list of children for future use
      this.children.push(compRef.instance);
      //There is potential use for this in the future. especially around automatin testing.
      //uncertain at this time.
      this.addChildViaJSON(widgetJSON);
    }
    addChildViaJSON(widgetJSON){
      this.infants.push(widgetJSON);
    }
    checkIfCurrentlySelected(selectedArray:Array<Widget>){
      //if this item exists in the list of currently selected items, mark it as such.
      this.isSelected = selectedArray.indexOf(this) != -1? true: false;
    }
    displayError(err:any){
      console.log(err);
    }
    //Emit an ouput event so that parent components can remove the current item
    removeSelf(event){
      this.parentActionReq.emit({
        action:"delete",
        item: this
      });
    }
    //Called upon receiving a parentActionReq.emit event requesting deletion of the current item. 
    removeChild(eventJSON:WidgetComs){
      let targetItem = eventJSON.item
      let index = this.children.indexOf(targetItem);
      //if the item exists in the array, remove it.
      if(index != -1){
        this.children.splice(index, 1);
        targetItem.curCompRef.destroy();
      }
    }

    ngOnDestroy(){
      //unsubscribe for performance gains.
      this._selectedItemSubscription.unsubscribe();
      this.parentActionReq.unsubscribe();
      //Remove any children of this component.
      for(let child of this.children){
        child.curCompRef.destroy();
      }
    }
}