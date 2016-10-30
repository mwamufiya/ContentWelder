import { Component, ViewChild, ViewChildren, QueryList, Input, ComponentFactoryResolver,
     Host, TemplateRef, ViewContainerRef, ChangeDetectorRef, forwardRef, OnInit, OnDestroy,
    HostListener
} from '@angular/core';
import { Widget } from './widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { WidgetFactory} from './widget-factory';
import { Parent } from './parent';
import { WidgetConfig, WidgetJson, WidgetDrop } from './widget.interface';
/*****Entry Components****** */
import { BoxWidget} from './widget-box.component';
import { ImageWidget } from './widget-image.component';
import { VideoWidget} from './widget-video.component';
import { TextboxWidget } from './widget-textbox.component';
import { FormWidget } from './widget-form.component';

@Component({
    moduleId: module.id,
  selector: 'designer-page',
  templateUrl: 'widget-page.component.html',
  styleUrls: ['widget-page.component.css'],
    inputs: ['widgetConfig'],
  entryComponents:[ImageWidget, VideoWidget, BoxWidget, TextboxWidget, FormWidget],
  providers: [
      {
          provide: Parent,
          useExisting: forwardRef(() => PageWidget)
      }
  ]
})
/**
 * @class PageWidget
 * @extends Widget
 * @classDesc Extends Page Widget. Handles actions taken on the stage
 */
export class PageWidget extends Widget implements OnInit, OnDestroy{
    @Host() @ViewChild('childCont', {read: ViewContainerRef}) childCont: ViewContainerRef;
    @ViewChild('cont1') tpl1: TemplateRef<Object>;
    widgetConfig: WidgetConfig;
    childWidgets:Array<JSON>;
    widgetType:string = 'pagewidget';

    /** @function
     * @param {ComponentFactoryResolver} componentFactoryResolver
     * @param {ViewContainerRef} viewContainer
     * @param {ChangeDetectorRef} changeDetectorRef
     * @param {DesignerGlobalsService} designerGlobals
     */
    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainer: ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
            super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
            super.setBackgroundColor('white');
    }

    /**
     * @function
     * @desc if a widget Config was passed, then it begins processing it.
     */
    ngOnInit(){
        this.parseWidgetConfig();
    }

    /** @function
     * @name onclick
     * @param event {DOM Event Handler}
     * @returns {boolean}
     * @description handles the user clicking on the stage
     */
    @HostListener('click', ['$event']) onclick(event):boolean{
        return super.onclick(event);
    }

    /** @function
     * @param {WidgetDrop Interface} event
     * @description Creates new components via ComponentFactory and places them as siblings of the ViewContainerRef
     */
    childModified(event:WidgetDrop){
        //Loop through all items being added and add.
        let index:number = 0;
        let fty = new WidgetFactory();
        for(let item of event.items){

            let output= fty.addWidget(this.componentResolver, this.childCont, item, event.insertionPoint);

            //if this item is the first in the array, do not append it. otherwise, we do;
            this.designerGlobals.setSelectedComponent(output.compRef.instance, index == 0? false : true);
            this.addChild(output.compRef, output.config);
            
            index++;
        }
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

        //now process any Page specific configurations

        //Do nothing if there are no children.
        if(!this.widgetConfig.items || !this.widgetConfig.items.length)
            return

        let factory = new WidgetFactory();
        this.widgetConfig.items.forEach( (item: WidgetConfig, index:number) => {
            let componentFactory = factory.getWidgetFactory(this.componentResolver, item['widgetType']);
            let ref = this.childCont.createComponent(componentFactory);
            this.designerGlobals.setSelectedComponent(ref.instance, false);
            this.addChild(ref, item);
        });

        this.changeDetectorRef.markForCheck();

    }
    /**
     * @function
     * @desc returns a JSON representation of the current Widget Object
     */
    toJson():WidgetConfig{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Page specific logic
        //TODO add page specific saveing logic

        return json;
    }

    /**
     * @function
     * @description calls the base class to handle removal action
     */
    ngOnDestroy():void{
        super.ngOnDestroy();
    }
}