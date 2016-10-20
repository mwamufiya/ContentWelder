import { Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SemanticModalComponent } from 'ng-semantic';
import { Subscription } from 'rxjs/Subscription';
import { Image } from '../widgets/image';
import { Video} from '../widgets/video';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { PageWidget } from '../widgets/widget-page.component';

@Component({
  selector: 'my-designer',
  templateUrl: './app/designer/designer.component.html',
  styleUrls: ['./app/designer/designer.component.css']
})
export class DesignerComponent implements OnInit{
    @ViewChild('videoChooser', {read: SemanticModalComponent}) videoChooser: SemanticModalComponent;
    @ViewChild('imageChooser', {read: SemanticModalComponent}) imageChooser: SemanticModalComponent;
    @ViewChild(PageWidget) private stageComponent: PageWidget;
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    private mediaChooserSubscription: Subscription;
    private _selectedImageSubscription: Subscription;
    private _selectedVideoSubscription: Subscription;
    private _selectedItemSubscription: Subscription;
    private video:Video;
    private image:Image;
    private isSelected:boolean;
    pageList:Array<any>;
    
    constructor(
      private compFactoryResolver: ComponentFactoryResolver,
      private router: Router,
      private liveRoute: ActivatedRoute,
      private designerGlobals: DesignerGlobalsService){
        this.mediaChooserInit();
        this.initializeSubscribers();
        console.log(this.liveRoute.params);
    }
    //Perform the task of fetching the Page Config from the server
    //For now just default to 1 page item. 
    ngOnInit():void{
      //TODO make a call to a service to retrieve the list of pages
      this.pageList = new Array();
      for(let i=0; i<1; i++){
        this.pageList.push(i);
      }
    }
    //handles subscribing to events in order to toggle the correct viewer
    mediaChooserInit():void{
      this.mediaChooserSubscription = this.designerGlobals.getMediaChooserObservable().subscribe(
          mediaType => {
              if(mediaType=='image') this.imageChooser.show();
              else this.videoChooser.show();
            },
          err => console.log(`Designer.component.ts: Failure in openeing a Media Chooser`)
        );
    }
    //changes the background acording to the user selection
    changeBackground(json):void{
      this.designerGlobals.setSelectedComponent(this);
      this.isSelected = true; 
      
      this.stageComponent.setBackgroundColor();
      let changeType = json.changeType;
      if(changeType=='video')
        this.videoChooser.show();
      else if(changeType=='image')
        this.imageChooser.show();
    }
    //Subscribes to choices made for either Image or Video
    initializeSubscribers(){
        //subscript to the selected item
        this._selectedItemSubscription = this.designerGlobals.getSelectedItemsObservable().subscribe(
          value => this.checkIfSelected(value),
          err => console.log(`Designer Component: Selected Item Subscription Error`)
        );
        //subscript to the selected Image
        this._selectedImageSubscription = this.designerGlobals.getSelectedImageObservable().subscribe(
          image => this.setImage(image),
          err => console.log(`Designer Component: Selected Image subscription Error`)
        );
        //subscript to the selected Video
        this._selectedVideoSubscription = this.designerGlobals.getSelectedVideoObservable().subscribe(
          video => this.setVideo(video),
          err => console.log(`Designer Component: Selected Video Subscription Error`)
        );
    }
    //Determines if this items is currently selected
    checkIfSelected(selectedArray:Array<Component>){
      //if this item exists in the list of currently selected items, mark it as such.
      this.isSelected = selectedArray.indexOf(this) != -1? true: null;
    }
    //handles setting the background asset-chooser
    setImage(image:Image){
      if(!this.isSelected)
        return;

      this.video = null;
      this.image = null;
      this.image = image; 
    }
    //handles setting the background video
    setVideo(video:Video){
      if(!this.isSelected)
        return;

      this.image = null;
      this.video = null;
      this.video = video;
    }
    getVideoBackgroundPath():string{
     return `url('${this.video.mediumLink.url}')`; 
    }
}