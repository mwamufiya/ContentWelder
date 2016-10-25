import {
    Component, ViewChild, ComponentFactoryResolver, ViewContainerRef, OnInit, ViewChildren,
    QueryList
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SemanticModalComponent } from 'ng-semantic';
import { Subscription } from 'rxjs/Subscription';
import { Image } from '../widgets/image';
import { Video} from '../widgets/video';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { PageWidget } from '../widgets/widget-page.component';
import { WidgetService } from '../widgets/widget.service'
import { WidgetConfig} from '../widgets/widget.interface'
import {Widget} from "../widgets/widget.component";

@Component({
  selector: 'my-designer',
  templateUrl: './app/designer/designer.component.html',
  styleUrls: ['./app/designer/designer.component.css']
})
export class DesignerComponent implements OnInit{
    @ViewChild('videoChooser', {read: SemanticModalComponent}) videoChooser: SemanticModalComponent;
    @ViewChild('imageChooser', {read: SemanticModalComponent}) imageChooser: SemanticModalComponent;
    @ViewChild(PageWidget) private stageComponent: PageWidget;
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    @ViewChildren (PageWidget) viewChildren: QueryList<PageWidget>;
    private mediaChooserSubscription: Subscription;
    private _selectedImageSubscription: Subscription;
    private _selectedVideoSubscription: Subscription;
    private _selectedItemSubscription: Subscription;
    private video:Video;
    private image:Image;
    private isSelected:boolean;
    id: number;                 //ID of the top level widget currently being worked on.
    name: String;               //Name of the current widget;
    pageList:Array<WidgetConfig>;


    /**
     * @constuctor
     * @param {ComponentFactoryResolver} compFactoryResolver
     * @param {Router} router
     * @param {ActivatedRoute} route
     * @param {DesignerGlobalsService} designerGlobals
     */
    constructor(
        private compFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private route: ActivatedRoute,
        private designerGlobals: DesignerGlobalsService,
        private widgetService: WidgetService){
        this.route = route;
    }

    /**
     * @function
     * @name ngOnInit
     * @description Handles initialization once the lifecycle hook kicks in
     */
    ngOnInit():void{
        this.mediaChooserInit();
        this.initializeSubscribers();

        //route.params is an observable that will fire on change
        //route.snapshot will obtain the value only once.
        //to handle future requests, params is used for now.
        this.route.params.forEach((params: Params) => {
            this.id = +params['id'];
            //if there is no ID then we must create a blank one.
            if(!this.id)
                this.parseWidgetConfig(null);
            else {
                this.widgetService.search('jsonserver', params)
                    .then(widgetConfig => {
                        this.parseWidgetConfig(widgetConfig);
                    });
            }
        });
    }
    //handles subscribing to events in order to toggle the correct viewer
    mediaChooserInit():void{
      this.mediaChooserSubscription = this.designerGlobals.getMediaChooserObservable().subscribe(
          mediaType => {
              if(mediaType=='image') this.imageChooser.show();
              else this.videoChooser.show();
            },
          err => console.log(`Designer.component.ts: Failure in openeing a Media Chooser`)
        );
    }
    //changes the background acording to the user selection
    changeBackground(json):void{
      this.designerGlobals.setSelectedComponent(this);
      this.isSelected = true; 
      
      this.stageComponent.setBackgroundColor();
      let changeType = json.changeType;
      if(changeType=='video')
        this.videoChooser.show();
      else if(changeType=='image')
        this.imageChooser.show();
    }
    //Subscribes to choices made for either Image or Video
    initializeSubscribers(){
        //subscript to the selected item
        this._selectedItemSubscription = this.designerGlobals.getSelectedItemsObservable().subscribe(
          value => this.checkIfSelected(value),
          err => console.log(`Designer Component: Selected Item Subscription Error`)
        );
        //subscript to the selected Image
        this._selectedImageSubscription = this.designerGlobals.getSelectedImageObservable().subscribe(
          image => this.setImage(image),
          err => console.log(`Designer Component: Selected Image subscription Error`)
        );
        //subscript to the selected Video
        this._selectedVideoSubscription = this.designerGlobals.getSelectedVideoObservable().subscribe(
          video => this.setVideo(video),
          err => console.log(`Designer Component: Selected Video Subscription Error`)
        );
    }
    //Determines if this items is currently selected
    checkIfSelected(selectedArray:Array<Component>){
      //if this item exists in the list of currently selected items, mark it as such.
      this.isSelected = selectedArray.indexOf(this) != -1? true: null;
    }
    //handles setting the background asset-chooser
    setImage(image:Image){
      if(!this.isSelected)
        return;

      this.video = null;
      this.image = null;
      this.image = image; 
    }
    //handles setting the background video
    setVideo(video:Video){
      if(!this.isSelected)
        return;

      this.image = null;
      this.video = null;
      this.video = video;
    }
    getVideoBackgroundPath():string{
     return `url('${this.video.mediumLink.url}')`; 
    }

    /**
     * @function
     * @param {WidgetConfig} jsonConfig - JSON representation of a widget Hierarchy
     * @description Parses the saved WidgetConfig Json. if non are found, a new empty page is created
     */
    parseWidgetConfig(jsonConfig: WidgetConfig):void{
        this.pageList = new Array<WidgetConfig>();

        //If no jsonconfig is returned, the we create a blank page.
        if(!jsonConfig)
            jsonConfig = this.getNewDocumentJson();

        console.log(jsonConfig);

        //At this point, we can be sure that there some widget configuration
        this.name = jsonConfig['name']? jsonConfig['name'] : null;
        jsonConfig.items.forEach( page => {
             this.pageList.push(page);
        });
    }

    /**
     * @function
     * @returns {{widgetType: string, name: string, items: {widgetType: string}[]}} WidgetConfig
     * @description returns the JSON for a blank document.
     */
    getNewDocumentJson():WidgetConfig{
        return {
            widgetType: "documentWidget",
            name: "[Change Me]",
            items: [
                {
                    widgetType: "pagewidget"
                }
            ]
        };
    }

    /**
     * @function
     * @description Save current configuration tos erver
     */
    saveConfig():void{

        let saveJson = {};

        //set the current object's ID if it exists so the service PUT/POST based on it's existance
        if(this.id)
            saveJson['id'] = this.id;

        //set the name if it exists
        if(this.name)
            saveJson['name'] = this.name;

        saveJson['items'] = [];
        //loop through each page to gather the appropriate JSON
        this.viewChildren.forEach( (item: Widget) => {
            saveJson['items'].push(item.toJson());
        });

        console.log(saveJson);
        console.log(JSON.stringify(saveJson));

        this.widgetService.save('jsonserver', saveJson);
    }
}