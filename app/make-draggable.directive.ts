import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';

@Directive({
    selector: '[makeDraggable]'
})

export class MakeDraggable {
    @Input('makeDraggable') data: any

    constructor(private el: ElementRef){
        el.nativeElement.draggable = 'true';
    }

    ngOnInit(){
        // Get the current element
        /*let el = this._elementRef.nativeElement.querySelector('li');
        
        // Set the draggable attribute to the element
        el.draggable = 'true';*/
    }
    @HostListener('dragstart',['$event']) ondragstart(event){
        var rect = this.el.nativeElement.getBoundingClientRect();
        //console.log(`I"m starting my position at X: ${rect.left} Y: ${rect.top} `);
        console.log(event);
        event.dataTransfer.setData('Text', event.path.length);
        //console.log(event.dataTransfer.getData('Text'));

    }
    @HostListener('dragend',['$event']) ondragend(event){
        //console.log(`I'm done dragging`)

    }
}
