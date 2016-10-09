import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'border-selection',
  templateUrl: './app/components/border-selection.component.html',
  styles:[`
    .borderPreview{
        height:1.5em;
        width:4em;
        border-width:5px;
        display:inline-block;
        border-color: #336699;
        margin:0;
        padding:0;
    }
    .borderPreview:first-of-type + label{
        text-transform: capitalize;
        padding-left:1em;
    }
  `],
  outputs: ['borderChanged']
})
export class BorderSelection {
    borderChanged:EventEmitter<any> = new EventEmitter();
    borderTypes:Array<any> = new Array();
    
    constructor(){
        this.setBorderTypes();
    }

    //Populate the array that drives the border types
    setBorderTypes():void{        
        this.borderTypes = [
            { value: 'none' },
            { value: 'dotted' },
            { value: 'dashed' },
            { value: 'solid' },
            { value: 'double' },
            { value: 'groove' },
            { value: 'ridge' },
            { value: 'inset' },
            { value: 'outset' }
        ];
    }

    changeBorderType(borderType:string):void{
        this.borderChanged.emit(borderType);
    }
}