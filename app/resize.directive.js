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
var Resize = (function () {
    function Resize(el, _ngZone, _changeDetector) {
        this.el = el;
        this._ngZone = _ngZone;
        this._changeDetector = _changeDetector;
        this.enableResize = false;
        this.jqueryResizeEnabled = false; //Keep track of the stage of the jquery so that we don't make calls to method prior to it being intialized
        this.resizeDone = new core_1.EventEmitter();
        this.active = null;
        this.resizeConfig = JSON.parse('{}');
    }
    Resize.prototype.ngOnInit = function () {
        this.enableResize = this.enableResize;
    };
    Resize.prototype.ngOnChanges = function (changes) {
        var change = (changes['enableResize'].currentValue == true) ? true : false;
        this.toggleResizeHandles(change);
    };
    //Handles calling adding the resize handles
    Resize.prototype.toggleResizeHandles = function (state) {
        var _this = this;
        var e = this.el.nativeElement;
        //the current state of Angular frameworks don't yet have a resizable module
        //as such jQuery is being used outside the zone to minimize impact on events
        if (state == true) {
            var containmentEL = this.getResizeConstrainingElement();
            /*this._ngZone.runOutsideAngular(() => jQuery(e).resizable({
                containment: containmentEL,
                stop: (event, ui) => this.resizeComplete(event, ui)
            }));*/
            jQuery(e).resizable({
                containment: containmentEL,
                stop: function (event, ui) { return _this.resizeComplete(event, ui); }
            });
            this.jqueryResizeEnabled = true;
        }
        else if (this.jqueryResizeEnabled == true) {
            this._ngZone.runOutsideAngular(function () { return jQuery(e).resizable("destroy"); });
            this.jqueryResizeEnabled = false;
        }
    };
    Resize.prototype.getResizeConstrainingElement = function () {
        var e = this.el.nativeElement;
        var containEl;
        while (!containEl) {
            //Putting a temporary hard stop contain at the stage level.
            //This needs to be made more dynamic so that the directive it not tied to the stage.
            if (e.parentElement.hasAttribute('resizeContain') || e.parentElement.nodeName.toLocaleLowerCase() == 'designer-stage')
                containEl = e.parentElement;
            else
                e = e.parentElement;
        }
        return containEl;
    };
    Resize.prototype.resizeComplete = function (event, ui) {
        //TODO: this isn't currently taking into account that the system is displaying a 1px border all around.
        //this will perhaps need to be substracted from the value passed.
        this.resizeDone.emit({ height: ui.size.height, width: ui.size.width });
        //if we want to pass percentage values, call this
        //this.resizeDone.emit(this.calculateDimensionRelativeToParent());   
    };
    //in order to allow for reactive design, we calculate the percentage height & width rather than Pixel based
    Resize.prototype.calculateDimensionRelativeToParent = function () {
        var e = this.el.nativeElement;
        var rect = e.getBoundingClientRect();
        var parentRect = e.parentElement.parentElement.getBoundingClientRect();
        return { "height": rect.height / parentRect.height * 100, "width": rect.width / parentRect.width * 100 };
    };
    Resize = __decorate([
        core_1.Directive({
            selector: '[resizeHandle]',
            inputs: ['enableResize', 'resizeConfig'],
            outputs: ['resizeDone']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone, core_1.ChangeDetectorRef])
    ], Resize);
    return Resize;
}());
exports.Resize = Resize;
//# sourceMappingURL=resize.directive.js.map