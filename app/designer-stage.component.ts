import { Component,
    OnInit,
    ViewChild,
    EventEmitter,
    ComponentFactoryResolver,
    ComponentFactory, 
    ComponentRef,
    EmbeddedViewRef,
    TemplateRef,
    ViewContainerRef} from '@angular/core';
import { Router } from '@angular/router';
import {Widget} from './widget.component'
import {DesignerDroppable} from './designer-droppable.directive';
import { Compiler} from '@angular/core';
import {WidgetFactory} from './widget-factory';
import {TextWidget} from './text-widget.component';
import {ImageWidget} from './image-widget.component';

@Component({
  selector: 'designer-stage',
  templateUrl: 'app/designer-stage.component.html',
  styleUrls: ['app/designer-stage.component.css'],
  entryComponents: [TextWidget, ImageWidget]
})
export class DesignerStageComponent implements OnInit {
    @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
    childWidgets:Array<JSON>;

    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router){
        this.childWidgets = [];
    }

    ngOnInit() {
    }

    addObject(event: any){
        alert('hello');
        console.log(event);
        //this.viewContainer.createEmbeddedView(this.vcr.createComponent(new TextWidget()));
    }

    childModified(event){
        //console.log(event);
        
        //let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextWidget);
        let componentFactory = new WidgetFactory().createWidget(this.viewContainer,this.componentFactoryResolver, event.widgetType,JSON.parse('{}'));
        
        let ref = this.container.createComponent(componentFactory);

        //this.childWidgets.push(JSON.parse('{}'));
    }

}