/**
 * Created by emwamufiya on 11/1/2016.
 */
import { Component, EventEmitter, OnInit} from '@angular/core';
import { FONTLIST } from '../services/fonts.service'

@Component({
    moduleId: module.id,
    selector: 'textstyle-selection',
    templateUrl: 'textstyle-selection.component.html',
    styleUrls:[`textstyle-selection.component.css`],
    outputs: ['styleChanged'],
    inputs:['inputStyle: style', 'mode']
})
export class TextStyleSelection implements OnInit{
    styleChanged: EventEmitter<any> = new EventEmitter();
    inputStyle: CSSStyleDeclaration;
    style: CSSStyleDeclaration = {} as CSSStyleDeclaration;
    mode: string = 'all';                                   //empty/all, family, size, color allowed options. Default is "empty/all"
    fontList:Array<{label:string, value:string}>;
    sizeList:Array<number> = [8,10,12,14,16,18,20,24,28,32,36,40,44,48,54,60,66,72,80,88,96];
    showFamily: boolean= true;
    showSize: boolean = true;
    showColor: boolean = true;

    constructor(){
        this.fontList = FONTLIST;
    }

    ngOnInit(){

        if(this.mode && !this.mode.length)
            return;

        //parse 'mode' to determine what values should be displayed.
        let list = this.mode.split(',');

        //Set all values to false
        this.showFamily = false;
        this.showSize = false;
        this.showColor = false;

        //loop through al values and set teh corresponding text properties
        list.forEach(v =>{
            switch(v.toLowerCase()){
                case 'family':
                    this.showFamily = true;
                    break;
                case 'size':
                    this.showSize = true;
                    break;
                case 'color':
                    this.showColor = true;
                    break;
                default:
                    this.showFamily = true;
                    this.showSize = true;
                    this.showColor = true;
            }
        });

        //because the Input style may contain more additional style properties beyond font-family, size & color,
        // we only take what we need and ignore the rest. this will allow the downstream process not to return undesired style properties
        if(this.inputStyle){
            if(this.inputStyle.color) this.style.color = this.inputStyle.color;
            if(this.inputStyle.fontFamily) this.style.fontFamily = this.inputStyle.fontFamily;
            if(this.inputStyle.fontSize) this.style.fontSize = this.inputStyle.fontSize;
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