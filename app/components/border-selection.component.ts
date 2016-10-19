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
  outputs: ['borderChanged'],
  inputs:['borderSize']
})
export class BorderSelection {
    borderChanged:EventEmitter<any> = new EventEmitter();
    borderTypes:Array<any> = new Array();
    borderStyle:string = "none";
    borderSize:number = 0;
    borderColor:string = 'black';
    sizeList:Array<number> = [8,10,12,14,16,18,20,24,28,32,36,40,44,48,54,60,66,72,80,88,96];
    
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

    changeBorderType(event:Event):void{
        let e = event.target as HTMLInputElement;
        this.borderStyle = e.value;
        this.updateBorder();
    }
    updateBorder(){
        this.borderChanged.emit(`${this.borderSize}px ${this.borderStyle} ${this.borderColor}`);
        console.log(this.borderChanged);
    }
    changeBorderSize(event:Event):void{
        let e = event.target as HTMLInputElement;
        this.borderSize = e.value.length ? parseInt(e.value) : 0;
        this.updateBorder();

    }
}