import { Component, HostListener, ChangeDetectorRef,
    ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from './widget.component'
import { Image } from '../../components/Image';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'designer-ImageWidget',
  templateUrl: './app/components/widgets/image.component.html',
  styles:[`
    img{
        height:100%;
        width:100%;
    }
    .widgetContainer{
        display:inline-block;
    }
    .emptyContainer{
        width:140px;
        height:100px;
    }
  `]
})
export class ImageWidget extends Widget{
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    defaultImgUrl:string = `http://placehold.it/140x100`;
    imgPath:string = this.defaultImgUrl;
    private _selectedImageSubscription: Subscription;
    image:Image;

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
        //subscript to the selected Image
        this._selectedImageSubscription = this.designerGlobals.getSelectedImageObservable().subscribe(
          image => this.setImage(image),
          err => super.displayError(`Error encountered when subscribing to observable`)
        );
    }

    @HostListener('click', ['$event']) onclick(event){
        return super.onclick(event);
    }
    setImage(image:Image){
        //Do nothing if this image isn't the currently selected image.
        if(!this.isSelected)
            return;

        this.image = image;
        this.imgPath = this.image.medResLink;
    }
    launchImageChooser(){
        this.designerGlobals.launchMediaChooser('image');
    }
}