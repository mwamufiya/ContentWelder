import { Component, OnInit, ViewChild, EventEmitter, ComponentFactoryResolver, ComponentFactory, 
    ComponentRef, EmbeddedViewRef, TemplateRef, ViewContainerRef, ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import { Compiler} from '@angular/core';
import { DesignerGlobalsService } from '../../services/designer-globals.service';

@Component({
  selector: 'designer-stage',
  templateUrl: './app/components/image/designer-stage.component.html',
  styleUrls: ['./app/components/image/designer-stage.component.css']
  //entryComponents: [TextWidget, ImageWidget]
})
export class ImageChooser{
}