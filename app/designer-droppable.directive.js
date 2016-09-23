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
var designer_globals_service_1 = require('./designer-globals.service');
var DesignerDroppable = (function (_super) {
    __extends(DesignerDroppable, _super);
    function DesignerDroppable(el, viewContainer, 
        //public templateRef: TemplateRef<any>,
        componentFactoryResolver, designerGlobals) {
        _super.call(this, el);
        this.viewContainer = viewContainer;
        this.componentFactoryResolver = componentFactoryResolver;
        this.designerGlobals = designerGlobals;
        this.widgetAdded = new core_1.EventEmitter();
    }
    DesignerDroppable.prototype.ondragover = function (event) {
        if (this.isElligable(event))
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
        //Only add an child if a it meets our elligability rules
        if (this.isElligable(event))
            this.addWidget(event);
        //Return false to prevent event propogation
        return false;
    };
    //Notify parent that a new child has been added
    DesignerDroppable.prototype.addWidget = function (event) {
        this.widgetAdded.emit({
            value: 'add',
            templateRef: this.el,
            widgetType: event.dataTransfer.getData('Text')
        });
        //console.log(this.childModified);
    };
    DesignerDroppable.prototype.getEl = function () {
        return _super.prototype.getEl.call(this);
    };
    DesignerDroppable.prototype.isElligable = function (event) {
        var isValid = true;
        //Do not allow an item to be dropped on itself to increse add a new child
        var draggedEventPath = this.designerGlobals.getDraggedObject();
        if (draggedEventPath[0] === event.path[0])
            isValid = false;
        //Do not allow a parent to be dragged into child elements
        if (event.path.length > draggedEventPath.length) {
            var arr = [];
            //Compare the Event.path array to determine if the "Drop" container is a child of the item currently being dragged
            //This is not the most efficient approach, and should be reviewed. However given that the Drop.Event doesn't contain the "dragg" item it needs to be obtained somehow
            if (draggedEventPath[0] === event.path[(event.path.length - draggedEventPath.length) - 1])
                arr = event.path.splice(0, (event.path.length - draggedEventPath.length) + 1).reverse(); //Since any item being dragged into a child would be defined higher in the Event.path array, we reverse the array to make the query faster;
            else
                arr = event.path;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === draggedEventPath[0]) {
                    isValid = false;
                    return;
                }
            }
        }
        return isValid;
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
        __metadata('design:paramtypes', [core_1.ElementRef, core_2.ViewContainerRef, core_1.ComponentFactoryResolver, designer_globals_service_1.DesignerGlobalsService])
    ], DesignerDroppable);
    return DesignerDroppable;
}(make_droppable_directive_1.MakeDroppable));
exports.DesignerDroppable = DesignerDroppable;
//# sourceMappingURL=designer-droppable.directive.js.map