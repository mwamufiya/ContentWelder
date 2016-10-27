import {
    Component, HostListener, ViewContainerRef, ComponentFactoryResolver, ViewRef,
    ComponentRef, EventEmitter, ChangeDetectorRef, Injector
} from '@angular/core';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';
import { WidgetComs, WidgetConfig, WidgetJson, WidgetResize } from './widget.interface';
import { WidgetService } from './widget.service'
import { FONTLIST } from '../services/fonts.service';

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
/**
 * @class Widget
 * @classDesc base class used by all widg
 */
export class Widget{
    //@ViewChild('placeholder', {read: ViewContainerRef}) placeholder;
    widgetType:string;
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
    hostView: ViewRef;
    curCompRef:ComponentRef<Widget>;
    changeDetectorRef:ChangeDetectorRef;
    style:CSSStyleDeclaration;
    fontList:Array<any>;
    viewIndex:number;                           //The index of the current view;
    /*********BACKGROUND************ */
    background:string;


    /** @function
     * @name constructor
     * @param {ComponentFactoryResolver} componentResolver
     * @param {ViewContainerRef} viewCont
     * @param {ChangeDetectorRef} changeDetectorRef
     * @param {DesignerGlobalsService} designerGlobals
     */
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
        //this.infants = new Array;

        this.style = {} as CSSStyleDeclaration;
        this.setupFonts();

        //subscript to the locally selected item
        this._selectedItemSubscription = this.designerGlobals.getSelectedItemsObservable().subscribe(
          value => this.checkIfCurrentlySelected(value),
          err => this.displayError(`Error encountered when subscribing to observable`)
        );
    }

    /**
     * @function
     * @name setupFonts
     * @description Handles setting up of fonts
     * @returns {void}
     */
    setupFonts():void{
      //TODO this list should be obtained from a shared service so it isn't called with every initialization
      this.fontList = FONTLIST;
    }

    /**
     * @function
     * @name onclick
     * @param {DOM Event} event
     * @returns {boolean}
     */
    @HostListener('click', ['$event']) onclick(event):boolean{
      event.stopPropagation();
      this.designerGlobals.setSelectedComponent(this, event.shiftKey? true : null);
      return false;
    }

    /**
     * @function
     * @name ondlbClick
     * @param {DOM Event} event
     * @returns {boolean}
     * @description placeholder for future handling of touch devices.
     */
    @HostListener('dblclick', ['$event']) ondblclick(event):boolean{
      event.stopPropagation();
      this.designerGlobals.setSelectedComponent(this, event.shiftKey? true : null);
      return false;
    }

    getChildren():Array<Widget>{
      return this.children;
    }

    /**
     * @function
     * @param {ViewRef} hostView
     * @description sets the host views so that it can be leveraged in the future
     */
    setHostView(hostView: ViewRef):void{
        this.hostView = hostView;
    }

    /**
     * @function
     * @returns {ViewRef}
     * @description get the hostView for a Widget Component.
     */
    getHostView():ViewRef{
        return this.curCompRef.hostView;
    }

    /**
     * @function
     * @param {ComponentRef} compRef
     * @param {WidgetConfig} configJson
     * @param {number} index - the position this item it being inserted into.
     * @description handles adding the children to the current Widget
     */
    addChild(compRef:ComponentRef<Widget>, configJson:WidgetConfig, index?:number){
        let instance = compRef.instance as Widget
        instance.parseWidgetConfig(configJson);

        //Because Dynamically created components cannot leverage angular's Input/Ouput,
        //we must subscript to the EventEmitter explicitly
        instance.parentActionReq.subscribe(compRef => this.removeChild(compRef));
        instance.changeDetectorRef.detectChanges();

        //Set the ComponentRef for use down the line.
        //TODO: Determine the performance impact of storing this
        compRef.instance.curCompRef = compRef;

        //Add the the item to our list of children for future use
        this.children.push(compRef.instance);
    }

    /**
     * @function
     * @name checkIfCurrentlySelected
     * @param {Array<Component> }selectedArray
     * @description if this instance of Widget exists in the provided lists, this.isSelected is set to true
     */
    checkIfCurrentlySelected(selectedArray:Array<Component>){
      //if this item exists in the list of currently selected items, mark it as such.
        this.isSelected = (selectedArray.indexOf(this) != -1)? true: null;
        //trigger change detection so that template is update to date.
        this.changeDetectorRef.detectChanges();
    }
    displayError(err:any){
      console.log(err);
    }

    /**
     * @function
     * @description defers removal to the parent container
     */
    //Emit an ouput event so that parent components can remove the current item
    removeSelf():void{
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

    /**
     * @function
     * @param {Number} height - Height in Pixels
     * @param {Number} width - Width in pixels
     * @param {boolean} initChange - allows callers to skip the change detection. Defaults to true
     */
    //update the dimensions of this widget upon completion of resize
    changeDimensions(height:number, width:number, initChange:boolean = true){
      let markForChange = false;
      /*if(height != null && this.style.height != `${height}px`){
        this.style.height = `${height}px`;
        markForChange = initChange? true : false;
      }*/
      if(width != null && this.style.width != `${width}%`){
        this.style.width = `${width}%`;
        markForChange = initChange? true : false;
      }

      //Remove the local styles assigned by Jquery-ui


      //Only request a ChangeDetection if we actually changed something.
      if(markForChange == true)
        this.changeDetectorRef.detectChanges();
    }

    /**
     * @function
     * @desc Helper method for templates to retrieve properties
     */
    getStylePropert(propName:string):string{
        return this.style[propName];
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

    /************Development**************** */
    log(val):void{
      console.log(val);
    }

    /**
     * @function
     * @desc Responses for taking a JSON object and updating this component
     */
    parseWidgetConfig(widgetConfig:WidgetConfig, markForChange:boolean = false):void{
        this.style = widgetConfig['style']? widgetConfig['style'] : this.style;

        if(markForChange==true)
            this.changeDetectorRef.markForCheck();
    }

    /**
     * @function
     * @description {WidgetConfig} returns a WidgetConfig JSON representation of the current Widget Object
     */
    toJson():WidgetConfig{
        let config = {
            widgetType: this.widgetType
        };

        //json['widgetType'] = this.widgetType;
        //TODO only save style if there is something to save
        config['style'] = this.style;

        //If there are no children, no further processing is required
        if(!this.children.length)
            return config;

        config['items'] = [];
        this.children.forEach( (item:Widget) => {
            config['items'].push(item.toJson());
        });

        return config;
    }

}