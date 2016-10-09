import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from '../directives/make-draggable.directive'
import { SemanticModalComponent } from 'ng-semantic';
import { Subscription } from 'rxjs/Subscription';
import { DesignerGlobalsService } from '../services/designer-globals.service';

@Component({
  selector: 'my-designer',
  templateUrl: './app/components/designer.component.html',
  styleUrls: ['./app/components/designer.component.css']
})
export class DesignerComponent{
    @ViewChild('videoChooser', {read: SemanticModalComponent}) videoChooser: SemanticModalComponent;
    @ViewChild('imageChooser', {read: SemanticModalComponent}) imageChooser: SemanticModalComponent;
    private mediaChooserSubscription: Subscription;
    constructor(
      private router: Router,
      private designerGlobals: DesignerGlobalsService){
        this.mediaChooserInit();
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

}