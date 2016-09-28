import { Directive, ElementRef, Input, HostListener, Inject} from '@angular/core';

@Directive({
    selector: '[makeDroppable]'
})

export class MakeDroppable{
    @Input('makeDroppable') data: any;
    el: ElementRef;

    backgroundColor:string;  
    constructor(el: ElementRef){
        this.el = el; 
        this.backgroundColor = el.nativeElement.style.backgroundColor.toString();
    }
    @HostListener('dragover', ['$event']) ondragover(event){
        event.stopPropagation();
        
        this.el.nativeElement.style.backgroundColor = "yellow";
        //this.el.nativeElement

        //Return false to prevent event propogation
        return false;
    }
    @HostListener('dragleave', ['$event']) ondragleave(event){
        event.stopPropagation();
        this.restoreBackgroundColor();
        return false;
    }
    @HostListener('drop', ['$event']) ondrop(event){
        event.stopPropagation();
        this.restoreBackgroundColor();
        //Return false to prevent event propogation
        return false;
    }

    restoreBackgroundColor(){
        this.el.nativeElement.style.backgroundColor = '';
    }
    getEl():ElementRef{
        return this.el;
    }
}
