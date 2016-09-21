import { Directive, 
    ElementRef, 
    Input, 
    HostListener, 
    ComponentFactoryResolver, 
    ComponentFactory, 
    ComponentRef,
    EmbeddedViewRef,
    TemplateRef,
EventEmitter, Output } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { MakeDroppable} from './make-droppable.directive';
import { TextWidget } from './text-widget.component';

@Directive({
    selector: '[designerDroppable]',
    inputs: ['designerDroppable'],
    outputs: ['widgetAdded']
})

export class DesignerDroppable extends MakeDroppable{
    //childModified = new EventEmitter();
    el: null;
    widgetAdded = new EventEmitter();

    constructor(
        el: ElementRef,
        private viewContainer: ViewContainerRef,
        //public templateRef: TemplateRef<any>,
        private componentFactoryResolver: ComponentFactoryResolver
        ){
        super(el);
    }
    @HostListener('dragover', ['$event']) ondragover(event){
        super.ondragover(event);
        //Return false to prevent event propogation
        return false;
    }
    @HostListener('dragleave', ['$event']) ondragleave(event){
        super.ondragleave(event);
        return false;
    }
    @HostListener('drop', ['$event']) onDrop(event){
        super.ondrop(event);
        console.log(`_______START______________`);
        console.log(event);
        console.log(event.dataTransfer.getData('Text'));
        console.log(event.path.length);
        console.log(`_______END______________`);
        if(event.dataTransfer.getData('Text') != event.path.length)
            this.addWidget();
        
        //Return false to prevent event propogation
        return false;
    }
    //Notify parent that a new child has been added
    addWidget(){
        console.log(this.el);
        this.widgetAdded.emit({
            value: 'add',
            templateRef: this.el
        });
        //console.log(this.childModified);
    }
    getEl():ElementRef{
        return super.getEl();
    }
    /*addWidget(textWidget: { new(): TextWidget }): ComponentRef<TextWidget>{
        //this.viewContainer.
        let dialogComponentFactory = 
            this.componentFactoryResolver.resolveComponentFactory(textWidget);
        
        let tw = this.componentFactoryResolver.resolveComponentFactory(textWidget);
        
        //

        let dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory, this.viewContainer.length);
        //this.viewContainer.createEmbeddedView();
        //let tw = TemplateRef<{new(): TextWidget}>;
        //let dialogComponentRef = this.viewContainer.createEmbeddedView(@Query(textWidget));

        return dialogComponentRef;
    }*/
}
