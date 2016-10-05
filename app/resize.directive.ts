import { Directive, 
    ElementRef, 
    Input, 
    HostListener, OnInit, OnChanges, SimpleChange, AfterViewInit, NgZone } from '@angular/core';
import { MakeDraggable} from './make-draggable.directive';
import { DesignerGlobalsService } from './designer-globals.service';

declare var jQuery:any;
@Directive({
    selector: '[resizeHandle]',
    inputs:['direction','snap']
})

export class ResizeHandle implements OnInit{
    direction:string;
    snap:number = 0;
    active:boolean = null;
    startingHeight:number;
    startingWidth:number;

    constructor(private el: ElementRef,
    private _ngZone: NgZone){
    }

    ngOnInit    (){
        //let e = this.el.nativeElement;
        //this._ngZone.runOutsideAngular(() => jQuery(e).resizable());
        //console.log(jQuery(e));
        //jQuery(e).resizable();
    }
}