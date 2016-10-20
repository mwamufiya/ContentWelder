import { Component, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver,
     Host, TemplateRef, ViewContainerRef, ChangeDetectorRef, forwardRef,
    HostListener
} from '@angular/core';
import { Widget } from './widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { WidgetDrop } from '../interfaces/widget-drop.interface';
import { WidgetFactory} from './widget-factory';
import { Parent } from './parent';
/*****Entry Components****** */
import { BoxWidget} from './widget-box.component';
import { ImageWidget } from './widget-image.component';
import { VideoWidget} from './widget-video.component';
import { TextboxWidget } from './widget-textbox.component';
import { FormWidget } from './widget-form.component'

@Component({
  selector: 'designer-page',
  templateUrl: './app/widgets/widget-page.component.html',
  styleUrls: ['./app/widgets/widget-page.component.css'],
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
export class PageWidget extends Widget{
    @Host() @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    @ViewChild('cont1') tpl1: TemplateRef<Object>; 
    childWidgets:Array<JSON>;

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
            let widgetConfig = factory.getWidgetConfigFromComponent(item);
            let componentFactory = factory.getWidgetFactory(this.componentResolver, widgetConfig.type);
            let ref = this.container.createComponent(componentFactory);

            let v = this.tpl1.createEmbeddedView(ref);
            this.viewCont.createEmbeddedView(this.tpl1, ref);
            //let v = this.viewCont.createEmbeddedView(this.tpl1, item);
            //let v = this.tpl1.createEmbeddedView(item);

            //if this item is the first in the array, do not append it. otherwise, we do;
            this.designerGlobals.setSelectedComponent(ref.instance, index == 0? false : true);
            this.addChild(ref, widgetConfig);
            
            index++;
        }
    }
}