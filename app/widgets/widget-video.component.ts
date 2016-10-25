import { Component, ElementRef, HostListener, ChangeDetectorRef, OnInit,
    ComponentFactoryResolver, ViewContainerRef, ViewChild, Query } from '@angular/core';
import { Widget } from './widget.component'
import { Video } from './video';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';
import { WidgetJson } from './widget.interface';

@Component({
  selector: 'designer-videoWidget',
  templateUrl: './app/widgets/widget-video.component.html',
  styles:[`
    :host{
        display:inline;
    }
    img{
        width:100%;
    }
    .emptyContainer{
        width:140px;
    }
  `]
})
export class VideoWidget extends Widget{
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    private _selectedVideoSubscription: Subscription;
    video:Video;
    videoDomEl:HTMLVideoElement;                        //DOM element for the Video Tag
    widgetType:string = 'videowidget';

    /**
     * @class
     * @param {ComponentFactoryResolver} componentFactoryResolver
     * @param {ViewContainerRef} viewContainer
     * @param {ChangeDetectorRef} changeDetectorRef
     * @param {DesignerGlobalsService} designerGlobals
     */
    constructor(
        componentFactoryResolver:ComponentFactoryResolver,
        viewContainer:ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);

        //subscript to the selected video
        this._selectedVideoSubscription = this.designerGlobals.getSelectedVideoObservable().subscribe(
          video => this.setVideo(video),
          err => super.displayError(`Error encountered when subscribing to observable`)
        );
    }

    @HostListener('click', ['$event']) onclick(event){
        return super.onclick(event);
    }
    //Open the video Chooser on doubleclick
    @HostListener('dblclick', ['$event']) ondblclick(event):boolean{
        super.ondblclick(event);
        this.launchVideoChooser();
        return false;
    }

    /**
     * @function
     * @param {Video} video
     * @desc sets the video for this widget & updates dimensions
     */
    setVideo(video:Video):void{
        //Do nothing if this widget isn't currently selected
        if(!this.isSelected){
            this.videoDomEl = null;
            return;
        }

        this.video = video;
        //Change the dimensions to be proportional
        let scaleValue = 200/this.video.smallLink.width;
        this.changeDimensions(this.video.smallLink.height*scaleValue, this.video.smallLink.width*scaleValue);

    }

    /**
     * @function
     * @returns {string} - url for the video
     * @desc Helper property so that the Template doesn't need to be aware which size to display
     */
    getVideoUrl():string{
        let url = '';

        if(this.video)
            url = this.video.smallLink.url;

        return url;
    }
    launchVideoChooser():void{
        this.designerGlobals.launchMediaChooser('video');
    }
    play(el):void{
        this.videoDomEl.play();
    }
    pause(el):void{
        this.videoDomEl.pause();
    }
    /**
     * @function
     * @desc returns a JSON representation of the current Widget Object
     */
    toJson():WidgetJson{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Page specific logic
        if(this.video)
            json['video'] = this.video;

        return json;
    }
}