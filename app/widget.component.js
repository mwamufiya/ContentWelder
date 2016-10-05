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
        this.removeCurrent = false; //marked to true when current item is requested to be removed;
        this.parentActionReq = new core_1.EventEmitter();
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
    Widget.prototype.addChild = function (compRef, widgetJSON) {
        var _this = this;
        //Because Dynamically created components cannot leverage angular's Input/Ouput, 
        //we must subscript to the EventEmitter manually
        compRef.instance.parentActionReq.subscribe(function (compRef) { return _this.removeChild(compRef); });
        //Set the ComponentRef for use down the line.
        compRef.instance.curCompRef = compRef;
        //Add the the item to our list of children for future use
        this.children.push(compRef.instance);
        //There is potential use for this in the future. especially around automatin testing.
        //uncertain at this time.
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
    //Emit an ouput event so that parent components can remove the current item
    Widget.prototype.removeSelf = function (event) {
        this.parentActionReq.emit({
            action: "delete",
            item: this
        });
    };
    //Called upon receiving a parentActionReq.emit event requesting deletion of the current item. 
    Widget.prototype.removeChild = function (eventJSON) {
        var targetItem = eventJSON.item;
        var index = this.children.indexOf(targetItem);
        //if the item exists in the array, remove it.
        if (index != -1) {
            this.children.splice(index, 1);
            targetItem.curCompRef.destroy();
        }
    };
    Widget.prototype.ngOnDestroy = function () {
        //unsubscribe for performance gains.
        this._selectedItemSubscription.unsubscribe();
        this.parentActionReq.unsubscribe();
        //Remove any children of this component.
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.curCompRef.destroy();
        }
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