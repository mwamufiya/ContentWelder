import { Directive, 
    ElementRef, 
    Input, 
    HostListener, OnInit, EventEmitter } from '@angular/core';
import { MakeDraggable} from './make-draggable.directive';
import { DesignerGlobalsService } from '../services/designer-globals.service';

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
    //Commented out in favor of putting the Widget JSON config into an attribute for easier testing and passing throughout application
    /*ngOnInit(){
        this.widgetType = this.widgetType;
    }*/
    
    @HostListener('dragstart',['$event']) ondragstart(event){
        super.ondragstart(event);
        event.dataTransfer.setData('text/html', super.getDomElement().nativeElement.innerHTML);
        this._dragStart(event);
    }
    //TODO: add support for mobile touch events
    //will most likely defer to 3rd party tools to as not to re-invent the wheel here.
    @HostListener('touchstart',['$event']) ontouchstart(event){
        super.ondragstart(event);
        this._dragStart(event);
    } 
    _dragStart(event){
        //Maintain a reference to the item being dragged because Event Drop does not have access
        //This may be a solution for mutlti touch solutions if multiple items can be dragged at the same time
        //CONCERN: this may be a performance bottleneck for documents that have very deep levels of nesting
        this.designerGlobals.setDraggedObject(event.path);
        this.designerGlobals.setDraggedWidgetJSON(JSON.parse(super.getDomElement().nativeElement.getAttribute('data-widgetConfig')));
    }
    ngOnInit(){
        this.widgetType = this.widgetType;
    }


}
