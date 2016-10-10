import { Directive, ElementRef, Input, HostListener, EventEmitter, Output,
    OnInit, OnChanges, SimpleChange, SimpleChanges, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { MakeDraggable} from './make-draggable.directive';
import { DesignerGlobalsService } from '../services/designer-globals.service';

declare var jQuery:any;
@Directive({
    selector: '[resizeHandle]',
    inputs:['enableResize','resizeConfig'],
    outputs:['resizeDone']
})

export class Resize implements OnInit{
    enableResize:boolean = false;
    jqueryResizeEnabled:boolean = false;                //Keep track of the stage of the jquery so that we don't make calls to method prior to it being intialized
    resizeDone:EventEmitter<any> = new EventEmitter();                
    direction:string;
    active:boolean = null;
    startingHeight:number;
    startingWidth:number;
    resizeConfig:JSON = JSON.parse('{}');

    constructor(private el: ElementRef,
    private _ngZone: NgZone,
    private _changeDetector: ChangeDetectorRef){
    }

    ngOnInit(){
        this.enableResize = this.enableResize;
    }
    ngOnChanges(changes:SimpleChanges){
        let change = (changes['enableResize'].currentValue==true)? true:false;
        this.toggleResizeHandles(change);        
    }
    //Handles calling adding the resize handles
    toggleResizeHandles(state:boolean){
        let e = this.el.nativeElement;
        //the current state of Angular frameworks don't yet have a resizable module
        //as such jQuery is being used outside the zone to minimize impact on events
        if(state==true){
            let containmentEL = this.getResizeConstrainingElement();
            this._ngZone.runOutsideAngular(() => jQuery(e).resizable({
                containment: containmentEL,
                stop: (event, ui) => this.resizeComplete(event, ui)
            }));
            
            this.jqueryResizeEnabled = true;
        }
        else if(this.jqueryResizeEnabled==true){  
            this._ngZone.runOutsideAngular(() => jQuery(e).resizable("destroy"));
            this.jqueryResizeEnabled = false;
        }
    }
    getResizeConstrainingElement():Element{
        let e = this.el.nativeElement as Element; 
        let containEl; 
        while (!containEl) {
            //Putting a temporary hard stop contain at the stage level.
            //This needs to be made more dynamic so that the directive it not tied to the stage.
            if(e.parentElement.hasAttribute('resizeContain')){
                containEl=e.parentElement;
            }else
                e=e.parentElement;
            //we don't care about anything outside the Designer Stage
            //TODO: this should probably be configurable
            if( e.parentElement.nodeName.toLocaleLowerCase()=='designer-stage'){
                e = null;
                break;
            }
        }
        return containEl;
    }
    resizeComplete(event, ui){
        //TODO: this isn't currently taking into account that the system is displaying a 1px border all around.
        //this will perhaps need to be substracted from the value passed.
        this.resizeDone.emit({height: ui.size.height, width: ui.size.width});

        //if we want to pass percentage values, call this
        //this.resizeDone.emit(this.calculateDimensionRelativeToParent());   
        
    }
    //in order to allow for reactive design, we calculate the percentage height & width rather than Pixel based
    calculateDimensionRelativeToParent():{}{
        let e = this.el.nativeElement as Element;
        let rect = e.getBoundingClientRect();
        let parentRect = e.parentElement.parentElement.getBoundingClientRect();        

        return {"height": rect.height/parentRect.height*100, "width":rect.width/parentRect.width*100};
    }
}