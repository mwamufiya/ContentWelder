import { Directive, 
    ElementRef, 
    Input, 
    HostListener, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { MakeDraggable} from './make-draggable.directive';
import { DesignerGlobalsService } from './designer-globals.service';

@Directive({
    selector: '[resizeable]',
    inputs:['displayBorders']
})

export class Resizeable implements OnChanges{
    displayBorders: boolean;

    constructor(private el: ElementRef){
    }
    OnInit(){
        
    }
    ngOnChanges(changes: {[propertyName: string]: SimpleChange}): void {
        let targetProp = 'displayBorders';
        if(changes[targetProp]){
            let curVal = JSON.stringify(changes[targetProp].currentValue);
            //TODO: for some reason values are being returned as an array []. will need to come back to this.
            this.displayBorders = (curVal == '[true]')? true : false;
            if(this.displayBorders == true)
                this.displayResizeableBorders();
        }
    }
    displayResizeableBorders(){
        let targetEl = this.el.nativeElement as Element;
        let children = targetEl.childNodes;
        for(let i=0; i<children.length; i++){
            if(children[i].nodeType==1){
                targetEl.classList.toggle('activeWidget');
                break;
            }
        }
        
    }
}

