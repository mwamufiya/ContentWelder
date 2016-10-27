import { Component, HostListener, ChangeDetectorRef, forwardRef, OnDestroy,
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
     * @description calls the base class to handle removal action
     */
    ngOnDestroy():void{
        super.ngOnDestroy();
    }
}