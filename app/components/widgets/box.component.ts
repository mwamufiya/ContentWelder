import { Component, HostListener, ChangeDetectorRef, forwardRef,
    ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Widget } from './widget.component';
import { WidgetContainer } from './widget-container.component';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { Parent } from '../parent';
import { WidgetFactory} from './widget-factory';
import { WidgetConfig } from '../../interfaces/widgetJSON.interface';
import { WidgetDrop } from '../../interfaces/widget-drop.interface';
import { DesignerToolsMenu} from '../designer-tools-menu.component';

@Component({
  selector: 'designer-BoxWidget',
  templateUrl: './app/components/widgets/box.component.html',
  styles:[`
    .emptyContainer{
        min-height:50px;
    }
  `],
  providers: [
      {
          provide: Parent,
          useExisting: forwardRef(() => BoxWidget)
      }
  ]
})
export class BoxWidget extends Widget{
    // Component input
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    compResolver:ComponentFactoryResolver;

    constructor(
        componentFactoryResolver:ComponentFactoryResolver,
        viewContainer:ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
        this.compResolver = componentFactoryResolver;
    }

    @HostListener('click', ['$event']) onclick(event){
        return super.onclick(event);
    }    

    //TODO: this class needs to extend widget-container. however I was unable to get this to work
    //The following logic is an exact duplicate of what is in widget-container
    childModified(event:WidgetDrop){     
        //Loop through all items being added and add.
        let index:number = 0;
        for(let item of event.items){
            //get the proper widgetType
            let widgetType:string;
            let widgetConfig:WidgetConfig;
            //get the widget Config based on the type of item being added.
            //TODO: this should probably be moved to some sort of factory.
            console.log(item.constructor.name);
            switch(item.constructor.name){
                case "DesignerToolsMenu":
                    widgetConfig = (item as DesignerToolsMenu).widgetConfig as WidgetConfig;
                    break;
                case "Widget":
                    break;
            }
            let componentFactory = new WidgetFactory().createWidget(this.compResolver, widgetConfig.type);
            let ref = this.container.createComponent(componentFactory);

            //if this item is the first in the array, do not append it. otherwise, we do;
            this.designerGlobals.setSelectedComponent(ref.instance, index == 0? false : true);
            this.addChild(ref, widgetConfig);
            
            index++;
        }
    }
    
}