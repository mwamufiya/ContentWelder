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
    MakeDraggable.prototype.ngOnInit = function () {
        // Get the current element
        /*let el = this._elementRef.nativeElement.querySelector('li');
        
        // Set the draggable attribute to the element
        el.draggable = 'true';*/
    };
    MakeDraggable.prototype.ondragstart = function (event) {
        var rect = this.el.nativeElement.getBoundingClientRect();
        //console.log(`I"m starting my position at X: ${rect.left} Y: ${rect.top} `);
        console.log(event);
        event.dataTransfer.setData('Text', event.path.length);
        //console.log(event.dataTransfer.getData('Text'));
    };
    MakeDraggable.prototype.ondragend = function (event) {
        //console.log(`I'm done dragging`)
    };
    __decorate([
        core_1.Input('makeDraggable'), 
        __metadata('design:type', Object)
    ], MakeDraggable.prototype, "data", void 0);
    __decorate([
        core_1.HostListener('dragstart', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MakeDraggable.prototype, "ondragstart", null);
    __decorate([
        core_1.HostListener('dragend', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], MakeDraggable.prototype, "ondragend", null);
    MakeDraggable = __decorate([
        core_1.Directive({
            selector: '[makeDraggable]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], MakeDraggable);
    return MakeDraggable;
}());
exports.MakeDraggable = MakeDraggable;
//# sourceMappingURL=make-draggable.directive.js.map