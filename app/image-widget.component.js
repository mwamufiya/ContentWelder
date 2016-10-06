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
var designer_globals_service_1 = require('./designer-globals.service');
var ImageWidget = (function (_super) {
    __extends(ImageWidget, _super);
    function ImageWidget(componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals) {
        _super.call(this, componentFactoryResolver, viewContainer, changeDetectorRef, designerGlobals);
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainer = viewContainer;
        this.changeDetectorRef = changeDetectorRef;
        this.defaultImgUrl = "http://placehold.it/140x100";
        this.imgPath = this.defaultImgUrl;
    }
    ImageWidget.prototype.onclick = function (event) {
        return _super.prototype.onclick.call(this, event);
    };
    __decorate([
        core_1.ViewChild('container', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], ImageWidget.prototype, "container", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], ImageWidget.prototype, "onclick", null);
    ImageWidget = __decorate([
        core_1.Component({
            selector: 'designer-ImageWidget',
            templateUrl: 'app/image-widget.component.html',
            styles: ["\n    img{\n        height:100%;\n        width:100%;\n    }\n    .widgetContainer{\n        display:inline-block;\n        /*temporary until actual image loading and resizing workds*/\n        width:140px;\n        height:100px;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef, core_1.ChangeDetectorRef, designer_globals_service_1.DesignerGlobalsService])
    ], ImageWidget);
    return ImageWidget;
}(widget_component_1.Widget));
exports.ImageWidget = ImageWidget;
//# sourceMappingURL=image-widget.component.js.map