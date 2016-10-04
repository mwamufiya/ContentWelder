import { Injectable,ElementRef, ComponentRef }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Widget } from './widget.component';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()
export class DesignerGlobalsService {
    private draggedObject: Array<ElementRef>;
    private draggedWidgetType: string;
    private draggedWidgetConfig: JSON;
    //private draggedOverObject: Node;
    private _selItemObservable: Observable<Array<Widget>>; //The currently selected component
    private selItemObserver: Observer<any>;
    private selItemList: Array<Widget>;

    constructor(private http: Http) {
        //We need to create a 'Hot' observable to allow for subscription to occur at different intervals
        this.selItemList = [];
        
        this._selItemObservable = new Observable<Array<Widget>>(observer => {
            this.selItemObserver = observer;
        }).share();
    }
    
    getDraggedObject():Array<ElementRef>{
        return this.draggedObject;
    }
    setDraggedObject(obj){
        this.draggedObject = obj;
    }

    getDraggedWidgetType(){
        return this.draggedWidgetType;
    }
    setDraggedWidgetType(type:string){
        this.draggedWidgetType = type || 'text';
    }

    setDraggedWidgetJSON(json:JSON){
        this.draggedWidgetConfig = json;
    }

    getDraggedWidgetJSON():JSON{
        return this.draggedWidgetConfig;
    }

    //this may be needed if the native "elementFromPoint" turns out to not be sufficient.
    /*setDraggedOverObject(node:Node){
        this.draggedOverObject = node;
    }
    getDraggedOverObject():Node{
        return this.draggedOverObject;
    }*/
    //if "Append" is specified it means this item should be added to the list of items.
    setSelectedComponent(widget:Widget, append?:boolean){
        //If the item being added already exists in the selected list do nothing
        let alreadyExists = (this.selItemList.indexOf(widget) == -1)? false : true; 
        if((alreadyExists == true && append == true)
        || (this.selItemList.length==1 && alreadyExists==true)) 
            return;
        
        //clear the existing list of items by default, otherwiwse we will append a value.    
        if(append==true)
            this.selItemList.push(widget);
        else
            this.selItemList = [widget];

        this.selItemObserver.next(this.selItemList);
    }
    getSelectedItemsObservable():Observable<Array<Widget>>{
        return this._selItemObservable;
    }
}
