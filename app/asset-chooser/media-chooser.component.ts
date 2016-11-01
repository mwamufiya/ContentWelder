import { Component, OnInit, EventEmitter, ViewContainerRef, ChangeDetectorRef, ViewChild,
} from '@angular/core';

import { DesignerGlobalsService } from '../services/designer-globals.service';
import { ImageService } from '../services/image.service';
import { VideoService } from '../services/video.service';
import { ModalDirective } from 'ng2-bootstrap';
import {Image} from '../widgets/image';
import {Video} from '../widgets/video';

@Component({
  moduleId: module.id,
  selector: 'media-chooser',
  templateUrl: 'media-chooser.component.html',
  styleUrls: ['media-chooser.component.css'],
  outputs: ['mediaChosen'],
  inputs:['searchType', 'mode']
})
export class MediaChooser implements OnInit{
  imageSources:Array<any> = new Array();
  videoSources:Array<any> = new Array();
  mediaList:Array<Image | Video> = new Array();
  @ViewChild('modalContainer') public modalContainer:ModalDirective
  mediaSource:string;
  searchTerm:string;
  mode:string;                                            //modal or inline. Default to inline
  searchType:string;                                      //Video or Image
  mediaChosen:EventEmitter<any> = new EventEmitter();

  constructor( private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        private designerGlobals: DesignerGlobalsService,
        private imageService: ImageService,
        private videoService: VideoService){
          
        this.getImageSources();
        this.getVideoSources();
  }
  //fetch the starting set of images
  ngOnInit(){
    this.searchType = this.searchType? this.searchType: 'image';
    this.mediaSource = 'pixabay';
  }
  //Set list of asset-chooser sources
  getImageSources():void{
    this.imageSources = [
      {
        name: 'Pixabay',
        value: 'pixabay',
        icon: 'https://pixabay.com/apple-touch-icon-144x144.png'
      },
      {
        name: 'google',
        value: 'google',
        icon: 'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Google-Search-icon.png'
      },
      {
        name: 'Image Library',
        value: 'internal',
        icon: 'images/instagram.png'
      },
      {
        name: 'instagram',
        value: 'ig',
        icon: 'images/instagram.png'
      },
      {
        name: 'facebook',
        value: 'fb',
        icon: 'images/facebook.png'
      }
    ];
  }
  //Set list of video sources
  getVideoSources():void{
    this.videoSources = [
      {
        name: 'Pixabay',
        value: 'pixabay',
        icon: 'https://pixabay.com/apple-touch-icon-144x144.png'
      },
      {
        name: 'google',
        value: 'google',
        icon: 'http://icons.iconarchive.com/icons/dtafalonso/android-l/512/Google-Search-icon.png'
      }
    ];

  }
  //Change the source of images upon user action
  changeMediaSource(imageSource:string):void{
    this.mediaSource = imageSource;
  }
  //Perform search upon user action
  performSearch(searchTerm?:string):void{
    //update current search term, and perform data cleansing.
    this.setSearchTerm(searchTerm);

    if(this.searchType=='image'){
      this.imageService.search(this.mediaSource, this.searchTerm)
        .then(media => {
          this.mediaList = new Array();
          this.mediaList = media;
        })
        .catch(e => this.handleImageSearchError(e));
    }else if(this.searchType=='video'){
      this.videoService.search(this.mediaSource, this.searchTerm)
        .then(media => {
          this.mediaList = new Array();
          this.mediaList = media;
        })
        .catch(e => this.handleImageSearchError(e));
    }
  }
  handleImageSearchError(e):void{
    //TODO:inform the user that an error occured.
    console.log(e);    
  }
  setSearchTerm(searchTerm?:string):void{
    //If there is not search term set the value to null and do nothing further.
    if(!searchTerm){
      this.searchTerm = null;
      return;
    }
    this.searchTerm = searchTerm.trim();
    //TODO add additional data clensing to keyword search
  }
  //alert appropriate liteners that asset-chooser was selected
  mediaSelected(selectedIndex){
    /*this.designerGlobals.setSelectedMedia(this.mediaList[selectedIndex]);
      this.mediaChosen.emit({
        "mediaType": this.searchType
      });*/
    //While having a single Observable for both images and Video makes code cleaner
    //the downside to this approach is that images will be listening to video events and vice versa. this increases overhead 
    //Therefore, two separate observables will be required
    if(this.searchType==`image`){
      this.designerGlobals.setSelectedImage(this.mediaList[selectedIndex] as Image);
      this.mediaChosen.emit({
        "chosen": true
      });
    }else if(this.searchType==`video`){
      this.designerGlobals.setSelectedVideo(this.mediaList[selectedIndex] as Video);
      this.mediaChosen.emit({
        "chosen": true
      });
    }
  }
  //Toggles between playing and pausing a video
  toggleVideo(index:string){
    for(let i=0; i<this.mediaList.length; i++){
      let vid = this.mediaList[i] as Video;
      if(parseInt(index)==i)
        vid.isActive=true;
      else
        vid.isActive=false;
    }
  }

  /**
   * @function
   * @description Open a modal dialog if the mode=='modal'
   */
  show():void{
    if(this.mode=='modal')
      this.modalContainer.show();
  }
  /**
   * @function
   * @description Hide a modal dialog if the mode=='modal'
   */
  hide():void{
    if(this.mode=='modal')
      this.modalContainer.hide();
  }
}