import { Directive, 
    ElementRef, 
    Input, 
    HostListener, OnInit } from '@angular/core';
import { MakeDraggable} from './make-draggable.directive';
import { DesignerGlobalsService } from './designer-globals.service';

@Directive({
    selector: '[designerDraggable]',
    inputs:['widgetType']
})

export class DesignerDraggable extends MakeDraggable implements OnInit{
    widgetType: string;
    
    constructor(el: ElementRef, private designerGlobals: DesignerGlobalsService){
        super(el);
    }

    //apparently the input isn't getting captured by the time the constructor is run. 
    //so we need to re-initialize the widgettype using the LifeCycle hook "onInit"
    ngOnInit(){
        this.widgetType = this.widgetType;
    }
    
    @HostListener('dragstart',['$event']) ondragstart(event){
        super.ondragstart(event);
        
        event.dataTransfer.setData('Text', this.widgetType)
        //Maintain a reference to the item being dragged because Event Drop does not have access
        //This may be a solution for mutlti touch solutions if multiple items can be dragged at the same time
        //CONCERN: this may be a performance bottleneck for documents that have very deep levels of nesting
        this.designerGlobals.setDraggedObject(event.path);
    }
    @HostListener('dragend',['$event']) ondragend(event){
        super.ondragend(event);
    }

}
