import { Injectable,ElementRef }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class DesignerGlobalsService {
    private draggedObject: Array<ElementRef>;
    private draggedWidgetType: string;
    private draggedWidgetConfig: JSON;
    private draggedOverObject: Node;
    constructor(private http: Http) {

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

    setDraggedOverObject(node:Node){
        this.draggedOverObject = node;
    }
    getDraggedOverObject():Node{
        return this.draggedOverObject;
    }
}
