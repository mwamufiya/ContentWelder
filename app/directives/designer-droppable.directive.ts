import {
    Directive, ElementRef, HostListener, ComponentFactoryResolver, EventEmitter,
    Output, TemplateRef, Input, ViewContainerRef,
} from '@angular/core';
import { MakeDroppable} from './make-droppable.directive';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Parent } from '../widgets/parent';
import { Widget } from '../widgets/widget.component';
import { WidgetDrop } from '../widgets/widget.interface';
import { WidgetFactory} from '../widgets/widget-factory';


@Directive({
    selector: '[designerDroppable]',
    outputs: ['widgetAdded']
})

export class DesignerDroppable{
    //childModified = new EventEmitter();
    defaultDragOverColor:string = 'yellow';
    draggOverHelper: Node;          //Dom element displayed when something is dragged over
    prvDraggedOverEl: Element;       //Previously draged over element
    prvInsertionPoint: boolean;      //insert item before or after item being dragged over
    widgetAdded: EventEmitter<WidgetDrop> = new EventEmitter<WidgetDrop>();
    reqInsertionPoint: number;
    parentComp: Widget;
    prvBkgColor:string;  //store the previous background color
    isEligible:boolean;
    prvDraggedEl:ElementRef;
    

    constructor(
        private el: ElementRef,
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private designerGlobals: DesignerGlobalsService,
        parentComponent: Parent
        ){
        this.parentComp = parentComponent as Widget;
    }

    /**
     * @function 
     * @param {Event} event - DOM Event
     * @description handles items being dragged over
     */
    @HostListener('dragover', ['$event']) ondragover(event: Event):boolean{
        event.stopPropagation();

        //if the item being dragged is the same as a previous one, we do nothing
        let draggedEl = this.designerGlobals.getDraggedObjectPath()[0];

        if(this.prvDraggedEl !== draggedEl){
             this.isDragEligible(event);
             this.setBackgroundColor();
        }
        
        this.addDragOverHelper(event);

        //Return false to prevent event propogation
        return false;
    }
    @HostListener('dragleave', ['$event']) ondragleave(event:Event):boolean{
        event.stopPropagation();
        this.restoreBackgroundColor();
        this.removeDragOverHelper();
        return false;
    }
    @HostListener('drop', ['$event']) onDrop(event: Event):boolean{
        event.stopPropagation();
        //get the widget's current background color;
        this.restoreBackgroundColor();
        
        //Only add an child if a it meets our elligability rules
        if(this.isEligible)
            this.addWidget(event, this.designerGlobals.getDraggedItems());

        this.removeDragOverHelper();

        //Return false to prevent event propogation
        return false;
    }
    //Notify parent that a new child has been added
    addWidget(event, items:Array<Parent>){
        this.widgetAdded.emit({
            value: 'add',
            templateRef: this.el,
            insertionPoint: this.reqInsertionPoint,
            items: items           
        });
    }

    isDragEligible(event){
        let isValid = true;
        //Do not allow an item to be dropped on itself to increase add a new child
        let draggedEventPath = this.designerGlobals.getDraggedObjectPath();
        let draggedItem = draggedEventPath[0]

        if(draggedItem === event.path[0])
            return this.isEligible = false;

        //becaue drag over fires continuously, in order to save on performance,
        //we cache the previous dragged item.
        //If the previous dragged item is the same as the current one being dragged, simply return the current 'isValid' value.
        
        if(this.prvDraggedEl === draggedItem)
            return this.isEligible;
        else
            this.prvDraggedEl = draggedItem;

        //Do not allow a parent to be dragged into child elements
        if(event.path.length > draggedEventPath.length){
            let arr = [];

            //Compare the Event.path array to determine if the "Drop" container is a child of the item currently being dragged
            //This is not the most efficient approach, and should be reviewed. However given that the Drop.Event doesn't contain the "dragg" item it needs to be obtained somehow
            if(draggedItem === event.path[(event.path.length - draggedEventPath.length)-1])
                arr = event.path.splice(0, (event.path.length - draggedEventPath.length)+1).reverse();  //Since any item being dragged into a child would be defined higher in the Event.path array, we reverse the array to make the query faster;
            else
                arr = event.path;

            for(let i=0; i<arr.length; i++){
                if(arr[i] === draggedItem){
                    isValid = false;
                    break;
                }
            }
        }

        return this.isEligible = isValid;
    }
    //Helper method to display a helper dom element when something is being dragged over.
    addDragOverHelper(event){
        //do nothing if we're already displaying an item

        let dropContEl = this.el.nativeElement;

        let draggedOverEl = document.elementFromPoint(event.clientX, event.clientY);

        let targetEls = this.getContChildren(draggedOverEl);
        let siblings = targetEls.nodeList;
        let dragOverIndex = targetEls.index;

        //Determine if we're inserting before or after the currently dragged over object
        let insertAfter = true;
        //we default to always inserting after
        // only if the current dragged over item is not the container do we look for further clarification
        if(draggedOverEl !== dropContEl)
            insertAfter = this.isInsertionPointAfter(draggedOverEl, event.clientX, event.clientY);

        //do nothing if the current Helper is still avlid based on mouse position
        //Else, remove the previous one, and update the new position.
        if(this.draggOverHelper === draggedOverEl ||
            (this.prvDraggedOverEl === draggedOverEl && insertAfter == this.prvInsertionPoint)){
            return;
        }else{
            this.removeDragOverHelper();
            this.prvInsertionPoint = insertAfter;
            this.prvDraggedOverEl = draggedOverEl;
        }

        //Get the dragged item from injection
        let draggedItem = this.designerGlobals.getDraggedItems()[0];

        //Create the placeholderItem
        let helperEl: Node;
        //if we're dealing with a widget, then clone the DOM Element so the user gets better feeback
        if(new WidgetFactory().isWidget(draggedItem.constructor.name)){
            let w = draggedItem as Widget;
            let e = document.createElement('div');
            e.classList.add('clonePlaceholder');
            let clone = w.viewCont.element.nativeElement.cloneNode(true);
            helperEl = e.appendChild(clone) as Node;
        }else{
            //Otherwise use the default helper element
            helperEl = document.createElement(`hr`) as Node;
        }

        this.draggOverHelper = helperEl;

        let insertionPoint = dragOverIndex;
        dropContEl = dropContEl as Node;
        //if the dragged over element is the drop container, then always append it.
        if(draggedOverEl as Node === dropContEl || siblings.length == dragOverIndex || (insertAfter==true && (dragOverIndex+1 > siblings.length))){
            dropContEl.appendChild(this.draggOverHelper);
            this.reqInsertionPoint = null;
        }else {
            let targetEl = (insertAfter==false)? siblings[dragOverIndex]: siblings[dragOverIndex + 1];
            dropContEl.insertBefore(this.draggOverHelper, targetEl);
        }
        this.reqInsertionPoint = insertionPoint;
    }

    /**
     * @function
     * @param {Node} el
     * @returns {{nodeList: Node[], index: number}}
     * @description returns list of immediate child nodes from this Drop Directive. also returns the index of the parent item in which INPUT.el belongs to
     */
    getContChildren(el: Node): {nodeList: Array<Node>, index: number}{
        let root = this.el.nativeElement;

        let e = el;
        let prvE: Node;
        while(e !== root){
            prvE = e;
            e = e.parentNode;
        }
        let list = e.childNodes;
        let index:number;


        let nodeList = new Array<Node>();
        //we only care about Node of type ==1
        //get the index position while were here
        for(let i = 0; i< list .length; i++) {
            let n = list[i];
            if(n.nodeType == 1)
                nodeList.push(n)
            if(n == prvE)
                index = nodeList.length-1;
        }

        return {
            nodeList: nodeList,
            index: index
        };
    }

    /**
     * @function
     * @description takes care of removing the helper Dom Element that is displayed on Drag Over
     */
    removeDragOverHelper(): void{
        if(this.draggOverHelper && this.draggOverHelper.parentNode) {
            this.draggOverHelper.parentNode.removeChild(this.draggOverHelper);
            this.draggOverHelper = null;
        }
    }
    //
    /**
     * @function
     * @param el
     * @param eventX
     * @param eventY
     * @returns {boolean}
     * @description Returns the "Tue" if the items is to be placed before the target object. and vice versa
     */
    isInsertionPointAfter(el:Element, eventX:Number, eventY:Number):boolean{
        let rect = el.getBoundingClientRect();
        let insertAfter = true;
        //We will only insert before if the 'X' is to the left of the horizontal center
        //AND the 'y' is above the vertical center.
        //TODO review this logic after use.
        /*
        1. If mouse is to the left of the center, insert before
            1A. mouse is below target box, insert after
        2. If mouse is to the right of center, insert after
            2A. if mouse is above target box, insert before
         */
        if((eventX < rect.left+(rect.width/2)) || eventY < rect.top)
            insertAfter = false;

        console.log(insertAfter);
        return insertAfter;
    }

    setBackgroundColor():void{
        this.prvBkgColor = this.parentComp.style.backgroundColor;
        this.parentComp.setStyleProperty('backgroundColor', this.defaultDragOverColor);
    }
    /**
     * @function
     * @description Restores the background color to what it was prior to the drag over
     */
    restoreBackgroundColor(): void{
        this.parentComp.setStyleProperty('backgroundColor', this.prvBkgColor);
        this.prvBkgColor = null;
    }
}
