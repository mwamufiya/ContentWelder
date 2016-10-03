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
var Resizeable = (function () {
    function Resizeable(el) {
        this.el = el;
    }
    Resizeable.prototype.OnInit = function () {
    };
    Resizeable.prototype.ngOnChanges = function (changes) {
        var targetProp = 'displayBorders';
        if (changes[targetProp]) {
            var curVal = JSON.stringify(changes[targetProp].currentValue);
            //TODO: for some reason values are being returned as an array []. will need to come back to this.
            this.displayBorders = (curVal == '[true]') ? true : false;
            if (this.displayBorders == true)
                this.displayResizeableBorders();
        }
    };
    Resizeable.prototype.displayResizeableBorders = function () {
        var targetEl = this.el.nativeElement;
        var children = targetEl.childNodes;
        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeType == 1) {
                targetEl.classList.toggle('activeWidget');
                break;
            }
        }
    };
    Resizeable = __decorate([
        core_1.Directive({
            selector: '[resizeable]',
            inputs: ['displayBorders']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Resizeable);
    return Resizeable;
}());
exports.Resizeable = Resizeable;
//# sourceMappingURL=resizeable.directive.js.map