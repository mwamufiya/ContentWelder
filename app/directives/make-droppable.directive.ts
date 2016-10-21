import { Directive, ElementRef, Input, HostListener} from '@angular/core';

@Directive({
    selector: '[makeDroppable]'
})

export class MakeDroppable{
    @Input('makeDroppable') data: any;
    el: ElementRef;
    prvBkgColor:string;  //store the previous background color

    constructor(el: ElementRef){
        this.el = el;
    }
    @HostListener('dragover', ['$event']) ondragover(event):boolean{
        event.stopPropagation();
        let e = this.el.nativeElement as HTMLElement;

        if(!this.prvBkgColor && this.prvBkgColor!='yellow'){
            this.prvBkgColor = e.style.backgroundColor;
        }
        e.style.backgroundColor = "yellow";
        console.log(e.style.backgroundColor)

        //Return false to prevent event propogation
        return false;
    }
    @HostListener('dragleave', ['$event']) ondragleave(event:Event, colorOveride?:string):boolean{
        event.stopPropagation();
        this.restoreBackgroundColor(colorOveride);
        return false;
    }
    @HostListener('drop', ['$event']) ondrop(event:Event, colorOveride?:string):boolean{
        event.stopPropagation();
        this.restoreBackgroundColor(colorOveride);
        //Return false to prevent event propogation
        return false;
    }
    //Resets the native items color unless otherwise specified
    //colorOveride: allows calling methods to choose a different color.
                    //this is done because the background color may have changed from the time of initialization until now;
    restoreBackgroundColor(colorOveride?:string):void{
        this.el.nativeElement.style.backgroundColor = colorOveride? colorOveride : this.prvBkgColor;
    }
    getEl():ElementRef{
        return this.el;
    }
}
