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
var MakeDroppable = (function () {
    function MakeDroppable(el) {
        this.el = el;
        this.backgroundColor = el.nativeElement.style.backgroundColor.toString();
    }
    MakeDroppable.prototype.ondragover = function (event) {
        event.stopPropagation();
        this.el.nativeElement.style.backgroundColor = "yellow";
        //this.el.nativeElement
        //Return false to prevent event propogation
        return false;
    };
    MakeDroppable.prototype.ondragleave = function (event) {
        event.stopPropagation();
        this.restoreBackgroundColor();
        return false;
    };
    MakeDroppable.prototype.ondrop = function (event) {
        event.stopPropagation();
        this.restoreBackgroundColor();
        //Return false to prevent event propogation
        return false;
    };
    MakeDroppable.prototype.restoreBackgroundColor = function () {
        this.el.nativeElement.style.backgroundColor = '';
    };
    MakeDroppable.prototype.getEl = function () {
        return this.el;
    };
    __decorate([
        core_1.Input('makeDroppable'), 
        __metadata('design:type', Object)
    ], MakeDroppable.prototype, "data", void 0);
    __decorate([
        core_1.HostListener('dragover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MakeDroppable.prototype, "ondragover", null);
    __decorate([
        core_1.HostListener('dragleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MakeDroppable.prototype, "ondragleave", null);
    __decorate([
        core_1.HostListener('drop', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MakeDroppable.prototype, "ondrop", null);
    MakeDroppable = __decorate([
        core_1.Directive({
            selector: '[makeDroppable]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MakeDroppable);
    return MakeDroppable;
}());
exports.MakeDroppable = MakeDroppable;
//# sourceMappingURL=make-droppable.directive.js.map