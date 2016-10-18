import { Component, HostListener, ViewContainerRef, ViewChild, ComponentFactoryResolver, 
   AfterViewInit, ComponentRef, OnDestroy, EventEmitter, Output, ChangeDetectorRef,
   ChangeDetectionStrategy
} from '@angular/core';
import { MakeDraggable } from '../../directives/make-draggable.directive'
import { DesignerDroppable } from '../../directives/designer-droppable.directive';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';
import { WidgetComs, WidgetConfig } from '../../interfaces/widgetJSON.interface';
import { WidgetResize } from '../../interfaces/WidgetResize.interface';
import { FONTLIST } from '../../services/fonts.service';

@Component({
  selector: 'designerWidget',
  //templateUrl: './app/components/widgets/widget.component.html',
  //Angular 2 components require a template, however, templates are not currently inherited by derived classes
  template: ``,
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
    width:number;
    height:number;
    x:number;
    y:number;
    name:string;
    desc:string;
    fontSizeList:Array<number> = [8,10,12,14,16,18,20,24,28,32,36,40,44,48,54,60,66,72,80,88,96];
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
    changeDetectorRef:ChangeDetectorRef;
    borderStyle:string;
    style:CSSStyleDeclaration;
    fontList:Array<any>;
    /*********BACKGROUND************ */ 
    background:string;



    constructor(
      componentResolver:ComponentFactoryResolver,
      viewCont:ViewContainerRef,
      changeDetectorRef: ChangeDetectorRef,
      designerGlobals: DesignerGlobalsService){
        this.componentResolver = componentResolver;
        this.viewCont = viewCont;
        this.changeDetectorRef = changeDetectorRef;
        this.designerGlobals = designerGlobals;
        this.children = new Array;
        this.infants = new Array;

        this.style = {} as CSSStyleDeclaration;
        this.setupFonts();

        //subscript to the locally selected item
        this._selectedItemSubscription = this.designerGlobals.getSelectedItemsObservable().subscribe(
          value => this.checkIfCurrentlySelected(value),
          err => this.displayError(`Error encountered when subscribing to observable`)
        );
    }
    //Get the list of fonts
    setupFonts():void{
      //TODO this list should be obtained from a shared service so it isn't called with every initialization
      this.fontList = FONTLIST;
    }

    childModified(event):void {
    }
    getWidth(withUnits?:boolean){ return this.width + ((withUnits==true)?'px':''); }
    getHeight(withUnits?:boolean){ return this.height +((withUnits==true)?'px':''); }
    
    @HostListener('click', ['$event']) onclick(event):boolean{
      event.stopPropagation();
      this.designerGlobals.setSelectedComponent(this, event.shiftKey? true : null);
      return false;
    }
    @HostListener('dblclick', ['$event']) ondblclick(event):boolean{
      event.stopPropagation();
      this.designerGlobals.setSelectedComponent(this, event.shiftKey? true : null);
      return false;
    }

    
    getChildren():Array<Widget>{
      return this.children;
    }
    addChild(compRef:ComponentRef<Widget>, configJson:WidgetConfig){
      //Because Dynamically created components cannot leverage angular's Input/Ouput, 
      //we must subscript to the EventEmitter manually
      compRef.instance.parentActionReq.subscribe(compRef => this.removeChild(compRef));
      //Set the ComponentRef for use down the line.
      compRef.instance.curCompRef = compRef;

      //Add the the item to our list of children for future use
      this.children.push(compRef.instance);
      //There is potential use for this in the future. especially around automatin testing.
      //uncertain at this time.
      //this.addChildViaJSON(widgetJSON);
    }
    addChildViaJSON(configJson:WidgetConfig){
      //this.infants.push(widgetJSON);
    }
    checkIfCurrentlySelected(selectedArray:Array<Component>){
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
    //Makes call to appropriate dimension handling method
    handleResize(eventJSON:WidgetResize){
      this.changeDimensions(eventJSON.height, eventJSON.width);
    }
    //update the dimensions of this widget upon completion of resize
    changeDimensions(height:number, width:number){
      let markForChange = false;
      if(height != null && this.height !== height){
        this.height = height;
        this.style.height = height.toString();
        markForChange = true;
      }
      if(width != null && this.width !== width){
        this.width = width;
        this.style.width = width.toString();
        markForChange = true;
      }
      //Only request a ChangeDetection if we actually changed something.
      if(markForChange == true)
        this.changeDetectorRef.markForCheck();
    }    

    //called by Angular when a component is destroyed
    //Handle cleanup for better performance. 
    ngOnDestroy(){
      //unsubscribe for performance gains.
      this._selectedItemSubscription.unsubscribe();
      this.parentActionReq.unsubscribe();
      //Remove any children of this component.
      for(let child of this.children){
        child.curCompRef.destroy();
      }
    }
    setStyleProperty(name:string, value:string){
      try{ 
        this.style[name] = value;
      }catch (e){
        //TODO display an error message
      }
    }
    //set the background Color
    setBackgroundColor(value?:string){
      this.style.backgroundColor = (value && value.length)? value: 'transparent';
    }
    //Set the text color
    setTextColor(value?:string):void{
      this.style.color = (value && value.length)? value: 'black';      
    }
    //Set the border styles
    setBorderStyle(value?:string):void{
      this.style.borderStyle = (value && value.length)? value: 'none';;
    }
    //set Text size
    setTextSize(value?:string):void{
      this.style.fontSize = (value && value.length)? value+'pt': '12pt'; 
    }
    //Set Font Family
    setFontFamily(value?:string):void{
      console.log(value);
      this.style.fontFamily = (value && value.length)? value: 'Helvetica';
    }
}