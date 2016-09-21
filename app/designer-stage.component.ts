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
import {TextWidget} from './text-widget.component';
import {DesignerDroppable} from './designer-droppable.directive';
import { Compiler} from '@angular/core';

@Component({
  selector: 'designer-stage',
  templateUrl: 'app/designer-stage.component.html',
  styleUrls: ['app/designer-stage.component.css'],
  entryComponents: [TextWidget, Widget],
})
export class DesignerStageComponent implements OnInit {
    @ViewChild('vcr', {read: ViewContainerRef}) vcr: ViewContainerRef;
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
        console.log(event);
        
        let tw = new TextWidget(this.componentFactoryResolver, this.viewContainer);
        this.childWidgets.push(JSON.parse('{}'));
    }

}