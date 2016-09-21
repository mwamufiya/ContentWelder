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

    /*ngOnInit(){
        // Get the current element
        let el = this._elementRef.nativeElement.querySelector('li');
        
        // Set the draggable attribute to the element
        el.draggable = 'true';
    }*/
    @HostListener('dragover', ['$event']) ondragover(event){
        //console.log(this.el);
        event.stopPropagation();
        /*console.log(event);
        console.log(event.dataTransfer.getData('Text'));
        console.log('-------------------');*/
        //if(String(event.srcElement) != String(this.el.nativeElement))
            this.el.nativeElement.style.backgroundColor = "yellow";
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
        console.log(event.dataTransfer.getData('Text'));
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
