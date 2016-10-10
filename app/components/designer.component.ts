import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SemanticModalComponent } from 'ng-semantic';
import { Subscription } from 'rxjs/Subscription';
import { Image } from './image';
import { Video} from './video';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { DesignerStageComponent } from './designer-stage.component';

@Component({
  selector: 'my-designer',
  templateUrl: './app/components/designer.component.html',
  styleUrls: ['./app/components/designer.component.css']
})
export class DesignerComponent{
    @ViewChild('videoChooser', {read: SemanticModalComponent}) videoChooser: SemanticModalComponent;
    @ViewChild('imageChooser', {read: SemanticModalComponent}) imageChooser: SemanticModalComponent;
    @ViewChild(DesignerStageComponent) private stageComponent: DesignerStageComponent;
    private mediaChooserSubscription: Subscription;
    private _selectedImageSubscription: Subscription;
    private _selectedVideoSubscription: Subscription;
    private video:Video;
    private image:Image;
    private isSelected:boolean;
    
    constructor(
      private router: Router,
      private designerGlobals: DesignerGlobalsService){
        this.mediaChooserInit();
        this.subscribeToMediaChanges();
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
    subscribeToMediaChanges(){
        //subscript to the selected Image
        this._selectedImageSubscription = this.designerGlobals.getSelectedImageObservable().subscribe(
          image => this.setImage(image),
          err => console.log(`Error encountered when subscribing to observable`)
        );
        //subscript to the selected Video
        this._selectedVideoSubscription = this.designerGlobals.getSelectedVideoObservable().subscribe(
          video => this.setVideo(video),
          err => console.log(`Error encountered when subscribing to observable`)
        );
    }
    //handles setting the background image
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