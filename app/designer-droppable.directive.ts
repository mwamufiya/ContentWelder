import { Directive, 
    ElementRef, 
    Input, 
    HostListener, 
    ComponentFactoryResolver, 
    ComponentFactory, 
    ComponentRef,
    EmbeddedViewRef,
    TemplateRef,
EventEmitter, Output } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MakeDroppable} from './make-droppable.directive';
import { TextWidget } from './text-widget.component';
import { DesignerGlobalsService } from './designer-globals.service';

@Directive({
    selector: '[designerDroppable]',
    inputs: ['designerDroppable'],
    outputs: ['widgetAdded']
})

export class DesignerDroppable extends MakeDroppable{
    //childModified = new EventEmitter();
    el: null;
    widgetAdded = new EventEmitter();

    constructor(
        el: ElementRef,
        private viewContainer: ViewContainerRef,
        //public templateRef: TemplateRef<any>,
        private componentFactoryResolver: ComponentFactoryResolver,
        private designerGlobals: DesignerGlobalsService
        ){
        super(el);
    }
    @HostListener('dragover', ['$event']) ondragover(event){
        if(this.isElligable(event))
            super.ondragover(event);
        //Return false to prevent event propogation
        return false;
    }
    @HostListener('dragleave', ['$event']) ondragleave(event){
        super.ondragleave(event);
        return false;
    }
    @HostListener('drop', ['$event']) onDrop(event){
        super.ondrop(event);
        //Only add an child if a it meets our elligability rules
        if(this.isElligable(event))
            this.addWidget(event);

        //Return false to prevent event propogation
        return false;
    }
    //Notify parent that a new child has been added
    addWidget(event){
        this.widgetAdded.emit({
            value: 'add',
            templateRef: this.el,
            widgetType: event.dataTransfer.getData('Text')
        });
        //console.log(this.childModified);
    }
    getEl():ElementRef{
        return super.getEl();
    }
    isElligable(event){
        let isValid = true;
        //Do not allow an item to be dropped on itself to increse add a new child
        let draggedEventPath = this.designerGlobals.getDraggedObject();
        if(draggedEventPath[0]===event.path[0])
            isValid = false;

        //Do not allow a parent to be dragged into child elements
        if(event.path.length > draggedEventPath.length){
            let arr = [];

            //Compare the Event.path array to determine if the "Drop" container is a child of the item currently being dragged
            //This is not the most efficient approach, and should be reviewed. However given that the Drop.Event doesn't contain the "dragg" item it needs to be obtained somehow
            if(draggedEventPath[0]===event.path[(event.path.length - draggedEventPath.length)-1])
                arr = event.path.splice(0, (event.path.length - draggedEventPath.length)+1).reverse();  //Since any item being dragged into a child would be defined higher in the Event.path array, we reverse the array to make the query faster;
            else
                arr = event.path;

            for(let i=0; i<arr.length; i++){
                if(arr[i] === draggedEventPath[0]){
                    isValid = false;
                    return;
                }
            }
        }
        return isValid;
    }
    /*addWidget(textWidget: { new(): TextWidget }): ComponentRef<TextWidget>{
        //this.viewContainer.
        let dialogComponentFactory = 
            this.componentFactoryResolver.resolveComponentFactory(textWidget);
        
        let tw = this.componentFactoryResolver.resolveComponentFactory(textWidget);
        
        //

        let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory, this.viewContainer.length);
        //this.viewContainer.createEmbeddedView();
        //let tw = TemplateRef<{new(): TextWidget}>;
        //let dialogComponentRef = this.viewContainer.createEmbeddedView(@Query(textWidget));

        return dialogComponentRef;
    }*/
}
