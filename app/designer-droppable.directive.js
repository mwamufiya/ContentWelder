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
var core_2 = require('@angular/core');
var make_droppable_directive_1 = require('./make-droppable.directive');
var DesignerDroppable = (function (_super) {
    __extends(DesignerDroppable, _super);
    function DesignerDroppable(el, viewContainer, 
        //public templateRef: TemplateRef<any>,
        componentFactoryResolver) {
        _super.call(this, el);
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.widgetAdded = new core_1.EventEmitter();
    }
    DesignerDroppable.prototype.ondragover = function (event) {
        _super.prototype.ondragover.call(this, event);
        //Return false to prevent event propogation
        return false;
    };
    DesignerDroppable.prototype.ondragleave = function (event) {
        _super.prototype.ondragleave.call(this, event);
        return false;
    };
    DesignerDroppable.prototype.onDrop = function (event) {
        _super.prototype.ondrop.call(this, event);
        console.log("_______START______________");
        console.log(event);
        console.log(event.dataTransfer.getData('Text'));
        console.log(event.path.length);
        console.log("_______END______________");
        if (event.dataTransfer.getData('Text') != event.path.length)
            this.addWidget();
        //Return false to prevent event propogation
        return false;
    };
    //Notify parent that a new child has been added
    DesignerDroppable.prototype.addWidget = function () {
        console.log(this.el);
        this.widgetAdded.emit({
            value: 'add',
            templateRef: this.el
        });
        //console.log(this.childModified);
    };
    DesignerDroppable.prototype.getEl = function () {
        return _super.prototype.getEl.call(this);
    };
    __decorate([
        core_1.HostListener('dragover', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DesignerDroppable.prototype, "ondragover", null);
    __decorate([
        core_1.HostListener('dragleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DesignerDroppable.prototype, "ondragleave", null);
    __decorate([
        core_1.HostListener('drop', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DesignerDroppable.prototype, "onDrop", null);
    DesignerDroppable = __decorate([
        core_1.Directive({
            selector: '[designerDroppable]',
            inputs: ['designerDroppable'],
            outputs: ['widgetAdded']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_2.ViewContainerRef, core_1.ComponentFactoryResolver])
    ], DesignerDroppable);
    return DesignerDroppable;
}(make_droppable_directive_1.MakeDroppable));
exports.DesignerDroppable = DesignerDroppable;
//# sourceMappingURL=designer-droppable.directive.js.map