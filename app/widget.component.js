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
var designer_globals_service_1 = require('./designer-globals.service');
var Widget = (function () {
    function Widget(componentResolver, viewCont, designerGlobals) {
        var _this = this;
        this.componentResolver = componentResolver;
        this.viewCont = viewCont;
        this.designerGlobals = designerGlobals;
        this.children = new Array;
        //subscript to the locally selected item
        this._selectedItemSubscription = this.designerGlobals.getSelectedItemsObservable().subscribe(function (value) { return _this.checkIfCurrentlySelected(value); }, function (err) { return _this.displayError("Error encountered when subscribing to observable"); });
    }
    Widget.prototype.childModified = function (event) {
    };
    Widget.prototype.onclick = function (event) {
        this.viewCont.element.nativeElement.classList.add('activeWidget');
        ;
    };
    Widget.prototype.getChildren = function () {
        return this.children;
    };
    Widget.prototype.addChild = function (child) {
        this.children.push(child);
    };
    Widget.prototype.checkIfCurrentlySelected = function (value) {
        console.log(value);
    };
    Widget.prototype.displayError = function (err) {
        console.log(err);
    };
    Widget.prototype.ngOnDestroy = function () {
        this._selectedItemSubscription.unsubscribe();
    };
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Widget.prototype, "onclick", null);
    Widget = __decorate([
        core_1.Component({
            selector: 'designerWidget',
            templateUrl: 'app/widget.component.html',
            styles: ["\n    :host{\n        display: flex;\n        border: 2px dotted red;\n        padding:2em;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [core_1.ComponentFactoryResolver, core_1.ViewContainerRef, designer_globals_service_1.DesignerGlobalsService])
    ], Widget);
    return Widget;
}());
exports.Widget = Widget;
//# sourceMappingURL=widget.component.js.map