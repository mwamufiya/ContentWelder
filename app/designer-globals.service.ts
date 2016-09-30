import { Injectable,ElementRef, ComponentRef }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Observer } from 'rxjs';
import { Widget } from './widget.component';
@Injectable()
export class DesignerGlobalsService {
    private draggedObject: Array<ElementRef>;
    private draggedWidgetType: string;
    private draggedWidgetConfig: JSON;
    //private draggedOverObject: Node;
    private _selItemObservable: Observable<Array<ComponentRef<Widget>>>; //The currently selected component
    private selItemObserver: Observer<any>;
    private selItemList: Array<ComponentRef<Widget>>;

    constructor(private http: Http) {
        /*this.data = new Observable<Array<ComponentRef<Widget>>>(observer => {
            this.selectedItemList.push(observer);
        });*/
        //We need to create a 'Hot' observable to allow for subscription to occur at different intervals
        this._selItemObservable = new Observable<Array<ComponentRef<Widget>>>(observer => {
            this.selItemObserver = observer;
        }).publish().refCount();
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
    setSelectedComponent(componentRef:ComponentRef<Widget>, append?:boolean){
        //clear the existing list of items by default, otherwiwse we will append a value.
        /*if(!append){
            this.selItemList = new Array<ComponentRef<Widget>>;
        this.selItemList.push(componentRef);*/
        this.selItemObserver.next(componentRef);
    }
    getSelectedItemsObservable():Observable<Array<ComponentRef<Widget>>>{
        return this._selItemObservable;
    }
}
