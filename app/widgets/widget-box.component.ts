import { Component, HostListener, ChangeDetectorRef, forwardRef, OnDestroy,
    ComponentFactoryResolver, ViewContainerRef, ViewChild} from '@angular/core';
import { Widget } from './widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Parent } from './parent';
import { WidgetFactory} from './widget-factory';
import { WidgetDrop, WidgetConfig} from './widget.interface';

@Component({
    moduleId: module.id,
  selector: 'designer-BoxWidget',
  templateUrl: 'widget-box.component.html',
    inputs: ['widgetConfig'],
  styles:[`
    .emptyContainer{
        height: 5%;
    }
  `],
  providers: [
      {
          provide: Parent,
          useExisting: forwardRef(() => BoxWidget)
      }
  ]
})
export class BoxWidget extends Widget implements OnDestroy{
    // Component input
    @ViewChild('childCont', {read: ViewContainerRef}) childCont: ViewContainerRef;
    widgetType:string = 'boxwidget';

    constructor(
        componentFactoryResolver:ComponentFactoryResolver,
        viewContainer:ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);    
    }

    @HostListener('click', ['$event']) onclick(event){
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
     * @description calls the base class to handle removal action
     */
    ngOnDestroy():void{
        super.ngOnDestroy();
    }
}