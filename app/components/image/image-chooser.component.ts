import { Component, OnInit, ViewChild, EventEmitter, 
    ComponentRef, TemplateRef, ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Compiler} from '@angular/core';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { ImageService } from '../../services/image.service';
import {Image} from '../image';

@Component({
  selector: 'image-chooser',
  templateUrl: './app/components/image/image-chooser.component.html',
  styleUrls: ['./app/components/image/image-chooser.component.css'],
  outputs: ['imageChosen']
})
export class ImageChooser implements OnInit{
  imageSources:Array<any> = new Array();
  searchCategories:Array<any> = new Array();
  imageList:Array<Image> = new Array();
  imageSource:string;
  searchTerm:string;
  imageChosen:EventEmitter<any> = new EventEmitter();

  constructor( private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        private designerGlobals: DesignerGlobalsService,
        private imageService: ImageService){
          
        this.getImageSources();
        this.getSearchCategories();
  }
  //fetch the starting set of images
  ngOnInit(){
    this.imageSource = 'google';
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
  //list of media type "Video/Image"
  //Since this is imagechooser, perhaps this can be moved out.
  getSearchCategories():void{
    this.searchCategories = [
      {
        name: 'Images',
        value: 'images',
        icon: 'image icon'
      },
      {
        name: 'Video',
        value: 'video',
        icon: 'file video outline icon'
      }
    ];
  }
  //Change the source of images upon user action
  changeImageSource(imageSource:string):void{
    this.imageSource = imageSource;
  }
  //Perform search upon user action
  performSearch(searchTerm?:string):void{
    //update current search term, and perform data cleansing.
    this.setSearchTerm(searchTerm);

    this.imageService.getImages(this.imageSource, this.searchTerm)
      .then(images => this.imageList = images)
      .catch(e => this.handleImageSearchError(e));
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
  imageSelected(imageIndex){
    this.designerGlobals.setSelectedImage(this.imageList[imageIndex]);
    this.imageChosen.emit({
      "chosen": true
    });
  }
}