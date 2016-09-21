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
var TextWidget = (function (_super) {
    __extends(TextWidget, _super);
    function TextWidget(compResolver, viewContainer) {
        _super.call(this, compResolver, viewContainer);
        this.compResolver = compResolver;
        this.viewContainer = viewContainer;
        this.name = 'helloWorld';
    }
    TextWidget.prototype.onclick = function () {
        //TODO
    };
    TextWidget.prototype.childModified = function (event) {
        this.childWidgets.push(JSON.parse('{}'));
    };
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TextWidget.prototype, "onclick", null);
    TextWidget = __decorate([
        core_1.Component({
            selector: 'designer-TextWidget',
            templateUrl: 'app/widget.component.html',
            styles: ["\n    div{\n        display: flex;\n        border: 2px dotted red;\n        background:white;\n        padding:2em;\n        resize:both;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef])
    ], TextWidget);
    return TextWidget;
}(widget_component_1.Widget));
exports.TextWidget = TextWidget;
//# sourceMappingURL=text-widget.component.js.map