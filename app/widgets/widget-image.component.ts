import { Component, HostListener, ChangeDetectorRef, forwardRef, Injector, OnInit,
    ComponentFactoryResolver, ViewContainerRef, ViewChild, OnDestroy } from '@angular/core';
import { Widget } from './widget.component';
import { Image } from './image';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';
import { Parent } from './parent';
import { WidgetJson, WidgetConfig } from './widget.interface';

@Component({
    selector: 'designer-ImageWidget',
    templateUrl: './app/widgets/widget-image.component.html',
    inputs: ['widgetConfig'],
    styles:[`
    :host{
        display:inline;
    }
    img{
        width:100%;
    }
    .widgetContainer{
        display:inline-block;
    }
    `],
    providers: [
      {
          provide: Parent,
          useExisting: forwardRef(() => ImageWidget)
      }
    ]
})
export class ImageWidget extends Widget implements OnInit, OnDestroy{
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    defaultImgUrl:string = `http://placehold.it/140x100`;
    imgPath:string = this.defaultImgUrl;
    private _selectedImageSubscription: Subscription;
    image:Image;
    widgetType:string = 'imagewidget';
    widgetConfig: WidgetConfig;

    /**
     * @class
     * @param componentFactoryResolver
     * @param viewContainer
     * @param changeDetectorRef
     * @param designerGlobals
     */
    constructor(
        componentFactoryResolver:ComponentFactoryResolver,
        viewContainer:ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
        //subscript to the selected Image
        this._selectedImageSubscription = this.designerGlobals.getSelectedImageObservable().subscribe(
          image => this.setImage(image),
          err => super.displayError(`Error encountered when subscribing to observable`)
        );
    }
    /**
     * @function
     * @description if a widget Config was passed, then it begins processing it.
     */
    ngOnInit(){
        if(!this.style.width)
            this.changeDimensions(null, 20);
        this.parseWidgetConfig();
    }

    @HostListener('click', ['$event']) onclick(event):boolean{
        return super.onclick(event);
    }
    //Open the Image Chooser on doubleclick
    @HostListener('dblclick', ['$event']) ondblclick(event):boolean{
        super.ondblclick(event);
        this.launchImageChooser();
        return false;
    }

    /**
     * @function
     * @param image
     * @param {Boolean} force   //overides validation that ensures the the image chooser is currently assigned to this item
     */
    setImage(image:Image, force:boolean = false){
        //Do nothing if this asset-chooser isn't the currently selected asset-chooser.
        if(!this.isSelected && !force)
            return;

        this.image = image;
        this.imgPath = this.image.medResLink;
    }
    hasImage():boolean{
        return this.image? true : null;
    }
    launchImageChooser(){
        this.designerGlobals.launchMediaChooser('image');
    }

    /**
     * @function
     * @description returns a JSON representation of the current Widget Object
     */
    toJson():WidgetConfig{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Page specific logic
        if(this.image)
            json['image'] = this.image;

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
        if(this.widgetConfig['image']) this.setImage(this.widgetConfig['image'], true);

    }

    /**
     * @function
     * @description calls the base class to handle removal action
     */
    ngOnDestroy():void{
        super.ngOnDestroy();
    }
}