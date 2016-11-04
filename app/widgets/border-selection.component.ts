import { Component, EventEmitter, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
  selector: 'border-selection',
  templateUrl: 'border-selection.component.html',
  styleUrls:[`border-selection.component.css`],
  outputs: ['styleChanged'],
    inputs:['inputStyle: style']
})
export class BorderSelection implements OnInit {
    borderChanged:EventEmitter<any> = new EventEmitter();
    borderRadiusChanged:EventEmitter<any> = new EventEmitter();
    borderTypes:Array<any> = new Array();
    borderStyle:string = "none";
    borderSize:number = 0;
    borderColor:string = 'black';
    borderRadius:number = 0;
    sizeList:Array<number> = [8,10,12,14,16,18,20,24,28,32,36,40,44,48,54,60,66,72,80,88,96];
    styleChanged: EventEmitter<any> = new EventEmitter();
    inputStyle: CSSStyleDeclaration;
    style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    
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

    ngOnInit(){
        //because the Input style may contain more additional style properties beyond font-family, size & color,
        // we only take what we need and ignore the rest. this will allow the downstream process not to return undesired style properties
        if(this.inputStyle){
            if(this.inputStyle.borderStyle) this.style.borderStyle= this.inputStyle.borderStyle;
            if(this.inputStyle.borderRadius) this.style.borderRadius = this.inputStyle.borderRadius;
            if(this.inputStyle.borderColor) this.style.borderColor = this.inputStyle.borderColor;
            if(this.inputStyle.borderWidth) this.style.borderWidth= this.inputStyle.borderWidth;
        }
    }

    setStyleProperty(name:string, value:string){
        try{
            this.style[name] = value;
        }catch (e){
            //TODO display an error message
        }

        this.styleChanged.emit(this.style);
    }
}