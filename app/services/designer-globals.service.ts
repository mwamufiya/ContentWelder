import { Injectable,ElementRef, Component }     from '@angular/core';
import { Http} from '@angular/http';
import { Image } from '../widgets/image';
import { Video } from '../widgets/video';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { Parent } from '../widgets/parent';

@Injectable()
export class DesignerGlobalsService {
    private draggedObject:Array<ElementRef>;
    private draggedItems:Array<Parent>;
    private draggedWidgetType: string;
    private draggedWidgetConfig: JSON;
    //private draggedOverObject: Node;
    private _selItemObservable: Observable<Array<Component>>; //The currently selected component
    private selItemObserver: Observer<any>;
    private selItemList: Array<Component>;
    //The currently selected Image
    private _selImageObservable: Observable<Image>; 
    private selImageObserver: Observer<any>;
    //The currently selected Video
    private _selVideoObservable: Observable<Video>; 
    private selVideoObserver: Observer<any>;
    //Allow communications between components and a single Media-chooser
    private _mediaChooserObservable: Observable<string>; 
    private mediaChooserObserver: Observer<any>;
    //Widget Factory Observable
    private _widgetFactoryObservable: Observable<string>; 
    private widgetFactoryObserver: Observer<any>;
    
    constructor(private http: Http) {
        this.setupObservables();
    }

    setupObservables():void{
        //We need to create a 'Hot' observable to allow for subscription to occur at different intervals
        this.selItemList = [];
        this.draggedItems = [];
        //The currently selected component
        this._selItemObservable = new Observable<Array<Component>>(observer => {
            this.selItemObserver = observer;
        }).share();
        //The currently selected Image
        this._selImageObservable = new Observable<Image>(observer => {
            this.selImageObserver = observer;
        }).share();
        //The currently selected Video
        this._selVideoObservable = new Observable<Video>(observer => {
            this.selVideoObserver = observer;
        }).share();
        //Allow communications between components and a single Media-chooser
         this._mediaChooserObservable = new Observable<string>(observer => {
            this.mediaChooserObserver = observer;
        }).share();
    }
    
    //get dragged item
    getDraggedItems():Array<Parent>{
        return this.draggedItems;
    }
    setDraggeditems(item:Parent, append?:boolean){
        if(append && append==true)
            this.draggedItems.push(item);
        else  
            this.draggedItems = [item];
    }

    getDraggedObjectPath():Array<ElementRef>{
        return this.draggedObject;
    }
    setDraggedObjectPath(obj){
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
    setSelectedComponent(widget:Component, append?:boolean){
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
    getSelectedItemsObservable():Observable<Array<Component>>{
        return this._selItemObservable;
    }
    /************Communication between components of the currently selected Image****************** */
    //While having a single Observable for both images and Video makes code cleaner
    //the downside to this approach is that images will be listening to video events and vice versa. this increases overhead 
    //Therefore the, two separate observables will be required
    /*setSelectedMedia(media:Image | Video){
        this.selMediaObserver.next(media);
    }
    getSelectedMediaObservable():Observable<Image | Video>{
        return this._selMediaObservable;
    }*/
    setSelectedImage(image:Image){
        this.selImageObserver.next(image);
    }
    getSelectedImageObservable():Observable<Image>{
        return this._selImageObservable;
    }
    setSelectedVideo(video:Video){
        this.selVideoObserver.next(video);
    }
    getSelectedVideoObservable():Observable<Video>{
        return this._selVideoObservable;
    }
    /*********Media Chooser****************/
    launchMediaChooser(mediaType:string){
        this.mediaChooserObserver.next(mediaType);
    }
    getMediaChooserObservable():Observable<string>{
        return this._mediaChooserObservable;
    }
}
