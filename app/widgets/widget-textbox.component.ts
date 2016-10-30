import { Component, HostListener, ChangeDetectorRef, forwardRef, OnDestroy,
    ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Widget } from './widget.component'
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Parent } from './parent';
import { WidgetConfig } from './widget.interface';

@Component({
    moduleId: module.id,
  selector: 'designer-TextboxWidget',
  templateUrl: 'widget-textbox.component.html',
    inputs: ['widgetConfig'],
  styles:[`
    :host{
        display:inline;
    }
    .widgetContainer{
        display:inline-block;
    }
    .emptyContainer{
        min-width:140px;
        min-height:100px;
    }
    .widgetContainer div{
        width:100%;
        padding:.5rem;
        line-height: initial;
    }
  `],
  providers: [
      {
          provide: Parent,
          useExisting: forwardRef(() => TextboxWidget)
      }
  ]
})
export class TextboxWidget extends Widget implements OnDestroy{
    // Component input
    content:string;
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    widgetType:string = 'textboxwidget';

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
    //Allow the user to start editing text on double click
    @HostListener('dblclick', ['$event']) ondblclick(event):boolean{
        super.ondblclick(event);
        return false;
    }
    updateContent(event: Event){
        this.content = event.srcElement.textContent.trim();
    }
    /**
     * @function
     * @desc returns a JSON representation of the current Widget Object
     */
    toJson():WidgetConfig{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Page specific logic
        json['content'] = this.content;

        return json;
    }

    /**
     * @function
     * @desc handles processing of widget config
     */
    parseWidgetConfig(config?: WidgetConfig){
        //Allows configuration to be set outside of OnInit.
        if(config) this.widgetConfig = config;

        //Do nothing if no widget config was provided
        if(!this.widgetConfig)
            return;

        //First let the base class handle all common areas
        super.parseWidgetConfig(this.widgetConfig);

        //now process any Image  specific configurations
        if(this.widgetConfig['content']) this.content = this.widgetConfig['content'];

    }

    /**
     * @function
     * @description calls the base class to handle removal action
     */
    ngOnDestroy():void{
        super.ngOnDestroy();
    }
}