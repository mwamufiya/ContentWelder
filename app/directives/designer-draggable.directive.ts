import { Directive, ElementRef, HostListener, Optional} from '@angular/core';
import { MakeDraggable} from './make-draggable.directive';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Widget } from '../widgets/widget.component';
import { Parent } from '../widgets/parent';

@Directive({
    selector: '[designerDraggable]',
})

export class DesignerDraggable extends MakeDraggable{

    constructor(el: ElementRef,
        private designerGlobals: DesignerGlobalsService, 
        @Optional() private parentComponent:Parent){
        super(el);
    }
    
    @HostListener('dragstart',['$event']) ondragstart(event){
        super.ondragstart(event);
        this._dragStart(event);
    }
    //TODO: add support for mobile touch events
    //will most likely defer to 3rd party tools to as not to re-invent the wheel here.
    @HostListener('touchstart',['$event']) ontouchstart(event){
        super.ondragstart(event);
        this._dragStart(event);
    } 
    _dragStart(event){
        //Store the objet being dragged so that downstream processes can get access to its properties
        //With touch/mobile devices, there may be a need to allowing dragging of multiple items.
        //If this is ever the case, simply provide the second parameter as true
        this.designerGlobals.setDraggeditems(this.parentComponent);           

        //Maintain a reference to the item being dragged because Event Drop does not have access
        //This may be a solution for mutlti touch solutions if multiple items can be dragged at the same time
        //CONCERN: this may be a performance bottleneck for documents that have very deep levels of nesting
        this.designerGlobals.setDraggedObjectPath(event.path);
        //this.designerGlobals.setDraggedWidgetJSON(JSON.parse(super.getDomElement().nativeElement.getAttribute('data-widgetConfig')));
    }
}
