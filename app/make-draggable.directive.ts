import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: '[makeDraggable]',
})

export class MakeDraggable {
    constructor(private el: ElementRef){
        el.nativeElement.draggable = 'true';
    }

    @HostListener('dragstart',['$event']) ondragstart(event){
        event.stopPropagation();
        var rect = this.el.nativeElement.getBoundingClientRect();
    }
    /*@HostListener('dragend',['$event']) ondragend(event){
        event.stopPropagation();
    }*/

    getDomElement(): ElementRef{
        return this.el;
    }
}
