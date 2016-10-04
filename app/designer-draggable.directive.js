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
var make_draggable_directive_1 = require('./make-draggable.directive');
var designer_globals_service_1 = require('./designer-globals.service');
var DesignerDraggable = (function (_super) {
    __extends(DesignerDraggable, _super);
    function DesignerDraggable(el, designerGlobals) {
        _super.call(this, el);
        this.designerGlobals = designerGlobals;
    }
    //apparently the input isn't getting captured by the time the constructor is run. 
    //so we need to re-initialize the widgettype using the LifeCycle hook "onInit"
    //Commented out in favor of putting the Widget JSON config into an attribute for easier testing and passing throughout application
    /*ngOnInit(){
        this.widgetType = this.widgetType;
    }*/
    DesignerDraggable.prototype.ondragstart = function (event) {
        _super.prototype.ondragstart.call(this, event);
        event.dataTransfer.setData('text/html', _super.prototype.getDomElement.call(this).nativeElement.innerHTML);
        //Maintain a reference to the item being dragged because Event Drop does not have access
        //This may be a solution for mutlti touch solutions if multiple items can be dragged at the same time
        //CONCERN: this may be a performance bottleneck for documents that have very deep levels of nesting
        this.designerGlobals.setDraggedObject(event.path);
        this.designerGlobals.setDraggedWidgetJSON(JSON.parse(_super.prototype.getDomElement.call(this).nativeElement.getAttribute('data-widgetConfig')));
    };
    DesignerDraggable.prototype.ngOnInit = function () {
        this.widgetType = this.widgetType;
    };
    __decorate([
        core_1.HostListener('dragstart', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DesignerDraggable.prototype, "ondragstart", null);
    DesignerDraggable = __decorate([
        core_1.Directive({
            selector: '[designerDraggable]',
            inputs: ['widgetType']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, designer_globals_service_1.DesignerGlobalsService])
    ], DesignerDraggable);
    return DesignerDraggable;
}(make_draggable_directive_1.MakeDraggable));
exports.DesignerDraggable = DesignerDraggable;
//# sourceMappingURL=designer-draggable.directive.js.map