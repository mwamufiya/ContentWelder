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
var ResizeHandle = (function () {
    function ResizeHandle(el, _ngZone) {
        this.el = el;
        this._ngZone = _ngZone;
        this.snap = 0;
        this.active = null;
    }
    ResizeHandle.prototype.ngOnInit = function () {
        //let e = this.el.nativeElement;
        //this._ngZone.runOutsideAngular(() => jQuery(e).resizable());
        //console.log(jQuery(e));
        //jQuery(e).resizable();
    };
    ResizeHandle = __decorate([
        core_1.Directive({
            selector: '[resizeHandle]',
            inputs: ['direction', 'snap']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
    ], ResizeHandle);
    return ResizeHandle;
}());
exports.ResizeHandle = ResizeHandle;
//# sourceMappingURL=resize.directive.js.map