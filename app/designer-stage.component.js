"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var widget_component_1 = require('./widget.component');
var widget_factory_1 = require('./widget-factory');
var text_widget_component_1 = require('./text-widget.component');
var image_widget_component_1 = require('./image-widget.component');
var designer_globals_service_1 = require('./designer-globals.service');
var DesignerStageComponent = (function (_super) {
    __extends(DesignerStageComponent, _super);
    function DesignerStageComponent(componentFactoryResolver, viewContainer, designerGlobals, router) {
        _super.call(this, componentFactoryResolver, viewContainer, designerGlobals);
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainer = viewContainer;
        this.router = router;
    }
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
        _super.prototype.addChild.call(this, ref, widgetJSON.widgetConfig);
        //super.addChildViaJSON(widgetJSON.widgetConfig);
    };
    DesignerStageComponent.prototype.childActionInitiated = function (event) {
        console.log("*************");
        console.log(event);
        _super.prototype.removeChild.call(this, event);
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
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef, designer_globals_service_1.DesignerGlobalsService, router_1.Router])
    ], DesignerStageComponent);
    return DesignerStageComponent;
}(widget_component_1.Widget));
exports.DesignerStageComponent = DesignerStageComponent;
//# sourceMappingURL=designer-stage.component.js.map