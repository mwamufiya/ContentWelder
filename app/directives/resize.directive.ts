import { Directive, ElementRef, EventEmitter, OnInit, SimpleChanges, NgZone, ChangeDetectorRef } from '@angular/core';

declare var jQuery:any;
@Directive({
    selector: '[resizeHandle]',
    inputs:['enableResize','resizeDirection'],
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
    resizeDirection:string;                             //both (default), Horizontal, Vertical

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
            let containmentEL = this.getResizeConstrainingElement(false);
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
    getResizeConstrainingElement(usePageAsLimit:boolean = true):Element{
        let e = this.el.nativeElement as Element; 
        let containEl; 
        while (!containEl) {
            //Putting a temporary hard stop contain at the stage level.
            //This needs to be made more dynamic so that the directive it not tied to the stage.
            let parentEl = e.parentElement;
            if(parentEl.hasAttribute('resizeContain')){
                containEl=parentEl;
            }else
                e=parentEl;
            //we don't care about anything outside the Designer Stage
            //TODO: this should probably be configurable
            let parentElName = parentEl.nodeName.toLocaleLowerCase();
            if(parentEl.classList.contains('cw-page') || parentElName =='designer-page' || parentElName =='body'){
                containEl = (usePageAsLimit==true)? parentEl : null;
                break;
            }
        }
        return containEl;
    }
    resizeComplete(event, ui){

        let e = this.el.nativeElement as HTMLElement;
        //We must get the dimensions before we remove local styles
        let rect = this.calculateDimensionRelativeToParent();
        //remove the localstyles that Jquery-ui adds. this should handled by other properties
        e.setAttribute('style', '');
        //TODO: this isn't currently taking into account that the system is displaying a 1px border all around.
        //this will perhaps need to be substracted from the value passed.
        //this.resizeDone.emit({height: ui.size.height, width: ui.size.width});

        //if we want to pass percentage values, call this
        this.resizeDone.emit(rect);
        
    }
    //in order to allow for reactive design, we calculate the percentage height & width rather than Pixel based
    calculateDimensionRelativeToParent():{}{
        let e = this.el.nativeElement as Element;
        let rect = e.getBoundingClientRect();
        let parentRect = this.getResizeConstrainingElement().getBoundingClientRect();

        return {"height": rect.height/parentRect.height*100, "width":rect.width/parentRect.width*100};
    }
}