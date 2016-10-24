import { Component, HostListener, ChangeDetectorRef, forwardRef,
    ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Widget } from './widget.component'
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Parent } from './parent';
import { WidgetJson } from './widget.interface';

@Component({
  selector: 'designer-TextboxWidget',
  templateUrl: './app/widgets/widget-textbox.component.html',
  styles:[`
    .widgetContainer{
        display:inline-block;
    }
    .emptyContainer, .emptyContainer div{
        min-width:140px;
        min-height:100px;
    }
    .widgetContainer div{
    
    }
  `],
  providers: [
      {
          provide: Parent,
          useExisting: forwardRef(() => TextboxWidget)
      }
  ]
})
export class TextboxWidget extends Widget{
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
    toJson():WidgetJson{
        //let Base class do the bulk of the work
        let json = super.toJson();

        //Handle Page specific logic
        json['content'] = this.content;

        return json;
    }
}