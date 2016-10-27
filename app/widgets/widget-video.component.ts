import { Component, ElementRef, HostListener, ChangeDetectorRef, OnDestroy, OnInit, Input,
    ComponentFactoryResolver, ViewContainerRef, ViewChild} from '@angular/core';
import { Widget } from './widget.component'
import { Video } from './video';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';
import { WidgetConfig } from './widget.interface';

@Component({
  selector: 'designer-videoWidget',
  templateUrl: './app/widgets/widget-video.component.html',
    inputs: ['widgetConfig'],
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
export class VideoWidget extends Widget implements OnInit, OnDestroy{
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

    /**
     * @function
     * @description if a widget Config was passed, then it begins processing it.
     */
    ngOnInit(){
        //we set the starting height if no width is specified
        //this is done so that images brought in start off small, then the user can resize them
        if(!this.style.width)
            this.changeDimensions(null, 15);
        this.parseWidgetConfig();
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
    toJson():WidgetConfig{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Page specific logic
        if(this.video)
            json['video'] = this.video;

        return json;
    }

    /**
     * @function
     * @desc handles creating any child widget components
     */
    parseWidgetConfig(config?: WidgetConfig){
        //Allows configuration to be set outside of OnInit.
        if(config) this.widgetConfig = config;

        //Do nothing if no widget config was provided
        if(!this.widgetConfig)
            return;

        //First let the base class handle all common areas
        super.parseWidgetConfig(this.widgetConfig);

        //now process any Image  specific configurations
        if(this.widgetConfig['video']) this.setVideo(this.widgetConfig['video']);

    }

    /**
     * @function
     * @description calls the base class to handle removal action
     */
    ngOnDestroy():void{
        super.ngOnDestroy();
    }
}