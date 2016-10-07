import { Component, OnInit, ViewChild, EventEmitter, ComponentFactoryResolver, ComponentFactory, 
    ComponentRef, EmbeddedViewRef, TemplateRef, ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Compiler} from '@angular/core';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import {Image} from '../image';

@Component({
  selector: 'image-chooser',
  templateUrl: './app/components/image/image-chooser.component.html',
  styleUrls: ['./app/components/image/image-chooser.component.css']
  //entryComponents: [TextWidget, ImageWidget]
})
export class ImageChooser{
  imageSources:Array<any> = new Array();
  searchCategories:Array<any> = new Array();
  imageList:Array<Image> = new Array();
  imageSource:string;
  searchTerm:string;
  constructor( private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        private designerGlobals: DesignerGlobalsService){
          
        this.getImageSources();
        this.getSearchCategories();
  }
  getImageSources(){
    this.imageSources = [
      {
        name: 'Pixabay',
        value: 'pixabay',
        icon: 'https://pixabay.com/apple-touch-icon-144x144.png'
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
      },
      {
        name: 'Image Library',
        value: 'internal',
        icon: ''
      }
    ];
  }
  getSearchCategories(){
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
  changeImageSource(event){
    console.log(event);
    //this.imageSource = event.
  }
  //Perform search upon user action
  performSearch(searchTerm:string){
    this.searchTerm = searchTerm.trim();
    //Display error if the search is empty
    if(!this.searchTerm.length){
      //TODO display error
      return;
    }

    //Now that we've cleansed the search, let's shoot for the stars.
    //console.log(searchTerm);
    this.imageList = this.fetchImages(searchTerm);
  }
  fetchImages(searchTerm):Array<Image>{
    let arr = new Array();
    let index = 0;
    for(let i=1; i<6; i++){
      arr.push(new Image(`baloon`, `http://www.bestmotherofthegroomspeeches.com/wp-content/themes/thesis/rotator/sample-${i}.jpg`));
    }

    return arr;
  }
}