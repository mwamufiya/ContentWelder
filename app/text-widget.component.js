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
var widget_component_1 = require('./widget.component');
var widget_factory_1 = require('./widget-factory');
var designer_globals_service_1 = require('./designer-globals.service');
var TextWidget = (function (_super) {
    __extends(TextWidget, _super);
    function TextWidget(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals) {
        _super.call(this, componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainer = viewContainer;
        this.changeDetectorRef = changeDetectorRef;
    }
    TextWidget.prototype.onclick = function (event) {
        return _super.prototype.onclick.call(this, event);
    };
    TextWidget.prototype.childModified = function (widgetJSON) {
        //console.log(widgetJSON.insertionPoint);
        var widgetConfig = widgetJSON.widgetConfig;
        var componentFactory = new widget_factory_1.WidgetFactory().createWidget(this.viewContainer, this.componentFactoryResolver, widgetConfig);
        var ref = this.container.createComponent(componentFactory, widgetJSON.insertionPoint);
        _super.prototype.addChild.call(this, ref, widgetConfig);
        /*console.log(super.getChildren().length);
        console.log(this.container.length);*/
    };
    TextWidget.prototype.childActionInitiated = function (event) {
        _super.prototype.removeChild.call(this, event);
    };
    __decorate([
        core_1.ViewChild('container', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], TextWidget.prototype, "container", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TextWidget.prototype, "onclick", null);
    TextWidget = __decorate([
        core_1.Component({
            selector: 'designer-TextWidget',
            templateUrl: 'app/text-widget.component.html',
            styles: ["\n    div[data-widgetType=\"textbox\"]:blank, div[data-widgetType=\"textbox\"]:-moz-only-whitespace{\n       \n    }\n    div[data-widgetType=\"textbox\"]{\n        \n    }\n    .emptyContainer{\n        min-height:50px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef, core_1.ChangeDetectorRef, designer_globals_service_1.DesignerGlobalsService])
    ], TextWidget);
    return TextWidget;
}(widget_component_1.Widget));
exports.TextWidget = TextWidget;
//# sourceMappingURL=text-widget.component.js.map