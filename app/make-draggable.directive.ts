import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: '[makeDraggable]',
})

export class MakeDraggable {
    constructor(private el: ElementRef){
        el.nativeElement.draggable = 'true';
    }

    @HostListener('dragstart',['$event']) ondragstart(event){
        var rect = this.el.nativeElement.getBoundingClientRect();
        //console.log(event.dataTransfer.getData('Text'));

    }
    @HostListener('dragend',['$event']) ondragend(event){
        //console.log(`I'm done dragging`)

    }
}
