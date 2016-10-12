import { Component, HostListener, ChangeDetectorRef, forwardRef,
    ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Widget } from './widget.component'
import {WidgetFactory} from './widget-factory';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { Parent } from '../parent';

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

    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
        super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
    }

    @HostListener('click', ['$event']) onclick(event){
        return super.onclick(event);
    }    
    
    childModified(widgetJSON):void {

        //console.log(widgetJSON.insertionPoint);
        let widgetConfig = widgetJSON.widgetConfig;
        let componentFactory = new WidgetFactory().createWidget(this.componentFactoryResolver, widgetConfig.type);
        let ref = this.container.createComponent(componentFactory,widgetJSON.insertionPoint);
        
        super.addChild(ref, widgetConfig );        
    }
}