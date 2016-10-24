import { Component, ViewChild, ViewChildren, QueryList, Input, ComponentFactoryResolver,
     Host, TemplateRef, ViewContainerRef, ChangeDetectorRef, forwardRef, OnInit,
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
  selector: 'designer-page',
  templateUrl: './app/widgets/widget-page.component.html',
  styleUrls: ['./app/widgets/widget-page.component.css'],
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
export class PageWidget extends Widget implements OnInit{
    @Host() @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
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
        let factory = new WidgetFactory();
        for(let item of event.items){
            let wConfig = factory.getWidgetConfigFromComponent(item);
            let componentFactory = factory.getWidgetFactory(this.componentResolver, wConfig.widgetType);
            let ref = this.container.createComponent(componentFactory);

            let v = this.tpl1.createEmbeddedView(ref);
            this.viewCont.createEmbeddedView(this.tpl1, ref);
            //let v = this.viewCont.createEmbeddedView(this.tpl1, item);
            //let v = this.tpl1.createEmbeddedView(item);

            //if this item is the first in the array, do not append it. otherwise, we do;
            this.designerGlobals.setSelectedComponent(ref.instance, index == 0? false : true);
            this.addChild(ref, wConfig);
            
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
            let ref = this.container.createComponent(componentFactory);
            this.designerGlobals.setSelectedComponent(ref.instance, false);
            this.addChild(ref, item);
        });

        this.changeDetectorRef.markForCheck();

    }
    /**
     * @function
     * @desc returns a JSON representation of the current Widget Object
     */
    toJson():WidgetJson{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Page specific logic
        //TODO add page specific saveing logic

        return json;
    }
}