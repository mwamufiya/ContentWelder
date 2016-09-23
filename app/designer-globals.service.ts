import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class DesignerGlobalsService {
    private draggedObject: Object[];
    constructor(private http: Http) {

    }
    
    getDraggedObject(){
        return this.draggedObject;
    }
    setDraggedObject(obj){
        this.draggedObject = obj;
    }
}
