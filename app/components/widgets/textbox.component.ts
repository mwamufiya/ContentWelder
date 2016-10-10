
import { Component, HostListener, ChangeDetectorRef,
    ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { Widget } from './widget.component'
import {WidgetFactory} from './widget-factory';
import { DesignerGlobalsService } from '../../services/designer-globals.service';

@Component({
  selector: 'designer-TextboxWidget',
  templateUrl: './app/components/widgets/textbox.component.html',
  styles:[`
    .widgetContainer{
        display:inline-block;
    }
    .emptyContainer{
        min-width:140px;
        min-height:100px;
    }
  `]
})
export class TextboxWidget extends Widget{
    // Component input
    content:string;
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
    updateContent(event: Event){
        this.content = event.srcElement.textContent.trim();
    }
}