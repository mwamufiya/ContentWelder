import { Component, OnInit, TemplateRef, HostListener, ChangeDetectorRef, ChangeDetectionStrategy,
    ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from '../directives/make-draggable.directive'
import { Widget } from './widget.component'
import { Video } from '../components/Video';
import { DesignerDroppable } from '../directives/designer-droppable.directive'
import {WidgetFactory} from './widget-factory';
import { DesignerGlobalsService } from '../services/designer-globals.service';
//import { SemanticModalComponent } from 'ng-semantic';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'designer-videoWidget',
  templateUrl: './app/components/video-widget.component.html',
  styles:[`
    img{
        height:100%;
        width:100%;
    }
    .widgetContainer{
        display:inline-block;
        /*temporary until actual image loading and resizing workds*/
        width:140px;
        height:100px;
    }
  `]
})
export class VideoWidget extends Widget{
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    private _selectedVideoSubscription: Subscription;
    video:Video;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
        //set starting dimensions
        super.changeDimensions(150, 200);
        
        //subscript to the selected video
        /*this._selectedVideoSubscription = this.designerGlobals.getSelectedVideoObservable().subscribe(
          video => this.setVideo(video),
          err => super.displayError(`Error encountered when subscribing to observable`)
        );*/
    }

    @HostListener('click', ['$event']) onclick(event){
        return super.onclick(event);
    }
    setVideo(video:Video){
        //Do nothing if this widget isn't currently selected
        if(!this.isSelected)
            return;

        this.video = video;
    }
    getVideoUrl():string{
        return this.video.url;
    }
}