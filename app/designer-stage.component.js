"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var widget_factory_1 = require('./widget-factory');
var text_widget_component_1 = require('./text-widget.component');
var image_widget_component_1 = require('./image-widget.component');
var DesignerStageComponent = (function () {
    function DesignerStageComponent(viewContainer, componentFactoryResolver, router) {
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.router = router;
        this.childWidgets = [];
    }
    DesignerStageComponent.prototype.ngOnInit = function () {
    };
    DesignerStageComponent.prototype.addObject = function (event) {
        alert('hello');
        console.log(event);
        //this.viewContainer.createEmbeddedView(this.vcr.createComponent(new TextWidget()));
    };
    DesignerStageComponent.prototype.childModified = function (widgetJSON) {
        //console.log(event);
        //let componentFactory = this.componentFactoryResolver.resolveComponentFactory(TextWidget);
        var componentFactory = new widget_factory_1.WidgetFactory().createWidget(this.viewContainer, this.componentFactoryResolver, widgetJSON);
        var ref = this.container.createComponent(componentFactory);
        //this.childWidgets.push(JSON.parse('{}'));
    };
    __decorate([
        core_1.ViewChild('container', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], DesignerStageComponent.prototype, "container", void 0);
    DesignerStageComponent = __decorate([
        core_1.Component({
            selector: 'designer-stage',
            templateUrl: 'app/designer-stage.component.html',
            styleUrls: ['app/designer-stage.component.css'],
            entryComponents: [text_widget_component_1.TextWidget, image_widget_component_1.ImageWidget]
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, core_1.ComponentFactoryResolver, router_1.Router])
    ], DesignerStageComponent);
    return DesignerStageComponent;
}());
exports.DesignerStageComponent = DesignerStageComponent;
//# sourceMappingURL=designer-stage.component.js.map