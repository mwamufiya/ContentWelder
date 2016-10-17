import { Component, ViewChild, ComponentFactoryResolver, ClassDefinition, Host,
    ComponentFactory, ViewContainerRef, ChangeDetectorRef, forwardRef} from '@angular/core';
import { Router } from '@angular/router';   
import { WidgetContainer} from './widget-container.component';
import { Widget } from './widget.component';
import { DesignerGlobalsService } from '../../services/designer-globals.service';
import { WidgetDrop } from '../../interfaces/widget-drop.interface';
import { WidgetConfig } from '../../interfaces/widgetJSON.interface';
import { DesignerToolsMenu} from '../designer-tools-menu.component';
import { WidgetFactory} from './widget-factory';
import { Parent } from '../parent';
/*****Entry Components****** */
import { BoxWidget} from './box.component';
import { ImageWidget } from './image.component';
import { VideoWidget} from './video.component';
import { TextboxWidget } from './textbox.component';

@Component({
  selector: 'designer-page',
  templateUrl: './app/components/widgets/page.component.html',
  styleUrls: ['./app/components/widgets/page.component.css'],
  entryComponents:[ImageWidget, VideoWidget, BoxWidget, TextboxWidget],
  providers: [
      {
          provide: Parent,
          useExisting: forwardRef(() => PageWidget)
      }
  ]
})
export class PageWidget extends Widget{
    @Host() @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    childWidgets:Array<JSON>;

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainer: ViewContainerRef,
        changeDetectorRef: ChangeDetectorRef,
        designerGlobals: DesignerGlobalsService){
            super(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
            super.setBackgroundColor('white');
    }
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