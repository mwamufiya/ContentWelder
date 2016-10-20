import { Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'border-selection',
  templateUrl: './app/components/border-selection.component.html',
  styleUrls:[`./app/components/border-selection.component.css`],
  outputs: ['borderChanged', 'borderRadiusChanged'],
  inputs:['borderSize']
})
export class BorderSelection {
    borderChanged:EventEmitter<any> = new EventEmitter();
    borderRadiusChanged:EventEmitter<any> = new EventEmitter();
    borderTypes:Array<any> = new Array();
    borderStyle:string = "none";
    borderSize:number = 0;
    borderColor:string = 'black';
    borderRadius:number = 0;
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
    updateBorder():void{
        this.borderChanged.emit(`${this.borderSize}px ${this.borderStyle} ${this.borderColor}`);
    }
    changeBorderSize(event:Event):void{
        let e = event.target as HTMLInputElement;
        this.borderSize = e.value.length ? parseInt(e.value) : 0;
        this.updateBorder();
    }
    setBorderColor(color:string):void{
        this.borderColor = (!color || !color.length)? 'black' : color;
        this.updateBorder();
    }
    changeBorderRadius(event:Event):void{
        let e = event.target as HTMLInputElement;
        this.borderRadius = e.value.length ? parseInt(e.value) : 0;
        console.log(this.borderRadius);
        this.borderRadiusChanged.emit(`${this.borderRadius}px`);
    }
}