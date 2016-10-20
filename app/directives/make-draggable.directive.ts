import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[makeDraggable]',
})

export class MakeDraggable {
    constructor(private el: ElementRef){
        el.nativeElement.draggable = 'true';
    }

    @HostListener('dragstart',['$event']) ondragstart(event){
        event.stopPropagation();
    }

    getDomElement(): ElementRef{
        return this.el;
    }
}
