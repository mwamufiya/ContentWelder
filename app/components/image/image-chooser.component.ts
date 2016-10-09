import { Component, OnInit, ViewChild, EventEmitter,
    ComponentRef, TemplateRef, ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Compiler} from '@angular/core';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { ImageService } from '../../services/image.service';
import { VideoService } from '../../services/video.service';
import {Image} from '../image';
import {Video} from '../video';

@Component({
  selector: 'image-chooser',
  templateUrl: './app/components/image/image-chooser.component.html',
  styleUrls: ['./app/components/image/image-chooser.component.css'],
  outputs: ['imageChosen'],
  inputs:['searchType']
})
export class ImageChooser implements OnInit{
  imageSources:Array<any> = new Array();
  videoSources:Array<any> = new Array();
  imageList:Array<Image> = new Array();
  videoList:Array<Video> = new Array();
  mediaSource:string;
  searchTerm:string;
  searchType:string;                                      //Video or Image
  imageChosen:EventEmitter<any> = new EventEmitter();

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
    this.performSearch();
  }
  //Set list of image sources
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
        .then(images => this.imageList = images)
        .catch(e => this.handleImageSearchError(e));
    }else if(this.searchType=='video'){
      this.videoService.search(this.mediaSource, this.searchTerm)
        .then(videos => this.videoList = videos)
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
  //alert appropriate liteners that image was selected
  mediaSelected(selectedIndex){
    if(this.searchType==`image`){
      this.designerGlobals.setSelectedImage(this.imageList[selectedIndex]);
      this.imageChosen.emit({
        "chosen": true
      });
    }else if(this.searchType==`video`){
      
    }
  }
  //Toggles between playing and pausing a video
  toggleVideo(index:string){
    //add +1 to index because DOM arrays start at 1, but javascript starts at 0
    let video = document.querySelectorAll(`.videoResults li:nth-child(${index+1}) video`)[0] as HTMLVideoElement;
    if(!video.paused && !video.ended && video.currentTime>0)
      video.pause();
    else
      video.play();
  }
}