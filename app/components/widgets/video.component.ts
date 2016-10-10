import { Component, ElementRef, HostListener, ChangeDetectorRef,
    ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from './widget.component'
import { Video } from '../../components/Video';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'designer-videoWidget',
  templateUrl: './app/components/widgets/video.component.html',
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
    videoDomEl:HTMLVideoElement;                        //DOM element for the Video Tag

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private elementRef: ElementRef,
        private changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
        //set starting dimensions
        super.changeDimensions(150, 200);
        
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
    setVideo(video:Video):void{
        //Do nothing if this widget isn't currently selected
        if(!this.isSelected){
            this.videoDomEl = null;
            return;
        }

        this.video = video;
        //get the Video Element for future Reference;
        /*console.log(this.elementRef.nativeElement as HTMLBaseElement);
        this.videoDomEl = (this.elementRef.nativeElement as HTMLBaseElement).querySelector('video');
        console.log(this.videoDomEl);*/
    }
    //Helper property so that the Template doesn't need to apply business logic
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
        console.log(el);
        this.videoDomEl.play();
    }
    pause(el):void{
        this.videoDomEl.pause();
    }
}