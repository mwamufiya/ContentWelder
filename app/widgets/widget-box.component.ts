import { Component, HostListener, ChangeDetectorRef, forwardRef,
    ComponentFactoryResolver, ViewContainerRef, ViewChild} from '@angular/core';
import { Widget } from './widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Parent } from './parent';
import { WidgetFactory} from './widget-factory';
import { WidgetDrop} from './widget.interface';

@Component({
  selector: 'designer-BoxWidget',
  templateUrl: './app/widgets/widget-box.component.html',
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

    //TODO: this class needs to extend widget-container. however I was unable to get this to work
    //The following logic is an exact duplicate of what is in widget-container
    childModified(event:WidgetDrop){     
        //Loop through all items being added and add.
        let index:number = 0;
        let factory = new WidgetFactory();
        for(let item of event.items){
            let widgetConfig = factory.getWidgetConfigFromComponent(item);
            let componentFactory = factory.getWidgetFactory(this.componentResolver, widgetConfig.type);
            let ref = this.container.createComponent(componentFactory);

            //if this item is the first in the array, do not append it. otherwise, we do;
            this.designerGlobals.setSelectedComponent(ref.instance, index == 0? false : true);
            this.addChild(ref, widgetConfig);
            
            index++;
        }
    }    
}