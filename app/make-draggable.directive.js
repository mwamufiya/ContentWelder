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
var MakeDraggable = (function () {
    function MakeDraggable(el) {
        this.el = el;
        el.nativeElement.draggable = 'true';
    }
    MakeDraggable.prototype.ondragstart = function (event) {
        event.stopPropagation();
        var rect = this.el.nativeElement.getBoundingClientRect();
    };
    /*@HostListener('dragend',['$event']) ondragend(event){
        event.stopPropagation();
    }*/
    MakeDraggable.prototype.getDomElement = function () {
        return this.el;
    };
    __decorate([
        core_1.HostListener('dragstart', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MakeDraggable.prototype, "ondragstart", null);
    MakeDraggable = __decorate([
        core_1.Directive({
            selector: '[makeDraggable]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MakeDraggable);
    return MakeDraggable;
}());
exports.MakeDraggable = MakeDraggable;
//# sourceMappingURL=make-draggable.directive.js.map