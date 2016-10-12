import { Component, ViewChild, ComponentFactoryResolver, ClassDefinition, Host,
    ComponentFactory, ViewContainerRef, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { WidgetContainer} from './widgets/widget-container.component';
import { Widget } from './widgets/widget.component';
import { DesignerGlobalsService } from '../services/designer-globals.service';

/*****Entry Components****** */
import { BoxWidget} from './widgets/box.component';
import { ImageWidget } from './widgets/image.component';
import { VideoWidget} from './widgets/video.component';
import { TextboxWidget } from './widgets/textbox.component';

@Component({
  selector: 'designer-stage',
  templateUrl: './app/components/designer-stage.component.html',
  styleUrls: ['./app/components/designer-stage.component.css'],
  entryComponents:[ImageWidget, VideoWidget, BoxWidget, TextboxWidget]
})
export class DesignerStageComponent extends WidgetContainer{
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
}