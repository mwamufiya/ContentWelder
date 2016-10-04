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
        this.infants = new Array;
        //subscript to the locally selected item
        this._selectedItemSubscription = this.designerGlobals.getSelectedItemsObservable().subscribe(function (value) { return _this.checkIfCurrentlySelected(value); }, function (err) { return _this.displayError("Error encountered when subscribing to observable"); });
    }
    Widget.prototype.childModified = function (event) {
    };
    Widget.prototype.onclick = function (event) {
        event.stopPropagation();
        this.designerGlobals.setSelectedComponent(this, event.shiftKey ? true : null);
        return false;
    };
    Widget.prototype.getChildren = function () {
        return this.children;
    };
    Widget.prototype.addChild = function (child, widgetJSON) {
        this.children.push(child);
        this.addChildViaJSON(widgetJSON);
    };
    Widget.prototype.addChildViaJSON = function (widgetJSON) {
        this.infants.push(widgetJSON);
    };
    Widget.prototype.checkIfCurrentlySelected = function (selectedArray) {
        //if this item exists in the list of currently selected items, mark it as such.
        this.isSelected = selectedArray.indexOf(this) != -1 ? true : false;
    };
    Widget.prototype.displayError = function (err) {
        console.log(err);
    };
    Widget.prototype.removeSelf = function (event) {
        console.log('event to be emmitted');
    };
    Widget.prototype.removeChild = function (ref) {
        var index = this.children.indexOf(ref);
        if (index != -1)
            this.children.splice(index, 1);
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