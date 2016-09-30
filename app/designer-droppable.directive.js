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
        if (this.isElligable(event)) {
            _super.prototype.ondragover.call(this, event);
            this.addDragOverHelper(event);
        }
        //Return false to prevent event propogation
        return false;
    };
    DesignerDroppable.prototype.ondragleave = function (event) {
        _super.prototype.ondragleave.call(this, event);
        this.removeDragOverHelper();
        return false;
    };
    DesignerDroppable.prototype.onDrop = function (event) {
        _super.prototype.ondrop.call(this, event);
        //Only add an child if a it meets our elligability rules
        if (this.isElligable(event))
            this.addWidget(event, this.designerGlobals.getDraggedWidgetJSON());
        this.removeDragOverHelper();
        //Return false to prevent event propogation
        return false;
    };
    //Notify parent that a new child has been added
    DesignerDroppable.prototype.addWidget = function (event, widgetConfig) {
        this.widgetAdded.emit({
            value: 'add',
            templateRef: this.el,
            insertionPoint: this.reqInsertionPoint,
            widgetConfig: widgetConfig
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
    //Helper method to display a helper dom element when something is being dragged over.
    DesignerDroppable.prototype.addDragOverHelper = function (event) {
        //do nothing if we're already displaying an item
        var dropCont = _super.prototype.getEl.call(this);
        var dropEl = dropCont.nativeElement;
        //get the position of the Drop Element
        //let dropIndex = dropCont.nativeElement.parentNode.children().indexOf(dropCont.nativeElement); 
        //Get the position of the current item being dragged on
        var children = Array.from(dropCont.nativeElement.parentNode.childNodes);
        var position = children.indexOf(dropCont.nativeElement);
        children = null;
        //insert a temporary copy of the "Dragged" element to insert it.
        var draggedOverEl = document.elementFromPoint(event.clientX, event.clientY);
        var parentNode = draggedOverEl.parentNode;
        var validNonTextNodes = Array.from(parentNode.childNodes).filter(function (n) { return n.nodeType == 1; });
        //Determine if we're inserting before or after the currently dragged over object
        var insertAfter = this.isInsertionPointAfter(draggedOverEl, event.clientX, event.clientY);
        //do nothing if the current Helper is still avlid based on mouse position 
        //Else, remove the previous one, and update the new position.
        //If the item currently being dragged over is teh drop target, then we must adjust where the helper is shown
        /*if(this.prvDraggedOverEl === draggedOverEl && insertAfter == this.prvInsertionPoint){
            console.log('no creating new helper');
            return;
        }else{*/
        this.removeDragOverHelper();
        this.prvInsertionPoint = insertAfter;
        this.prvDraggedOverEl = (draggedOverEl === dropEl) ? dropEl : draggedOverEl;
        //}
        //Create the placeholderItem
        this.draggOverHelper = document.createElement("hr");
        var insertionPoint = null;
        if (insertAfter == false) {
            var targetEl = draggedOverEl;
            //if the item is being dragged over the current drop zone, 
            //find the first child of this container and insert it before it.
            if (draggedOverEl === dropEl) {
                dropEl.insertBefore(this.draggOverHelper, dropEl.childNodes[0]);
                insertionPoint = 0;
            }
            else {
                parentNode.insertBefore(this.draggOverHelper, targetEl);
                insertionPoint = validNonTextNodes.indexOf(targetEl);
            }
        }
        else {
            //IF there is no next sibling, then we must append this item as the last child in the parent container
            //ELSE we must get the next sibling in order to user "node.InsertBeore()" method
            var targetEl = dropEl;
            if (draggedOverEl === dropEl) {
                dropEl.appendChild(this.draggOverHelper);
                insertionPoint = null;
            }
            else {
                //TODO: review dependency on "template" tag.
                //Because the "template" element is used in templates, we need to go one level above the current item to find the next sibling
                //This does place a dependency on the "Template" tag.
                //Given that Angular uses templates underneath the covers, should be low impact.
                //however developers adding new component will need to be aware of this.
                var nextEl = draggedOverEl.parentNode.nextSibling;
                //If the next sibling is null, that means we can simply append the item to insert it as the last item.
                if (nextEl == null) {
                    parentNode.appendChild(this.draggOverHelper);
                    insertionPoint = null;
                }
                else {
                    console.log("you should be getting here");
                    nextEl.parentNode.insertBefore(this.draggOverHelper, nextEl);
                    insertionPoint = Array.from(nextEl.parentNode.childNodes).filter(function (n) { return n.nodeType == 1; }).indexOf(nextEl) - 1;
                }
            }
        }
        this.reqInsertionPoint = insertionPoint;
    };
    DesignerDroppable.prototype.removeDragOverHelper = function () {
        if (this.draggOverHelper) {
            this.draggOverHelper.parentNode.removeChild(this.draggOverHelper);
            this.draggOverHelper = null;
        }
    };
    //Returns the "After or before" based on the position of the 
    DesignerDroppable.prototype.isInsertionPointAfter = function (el, eventX, eventY) {
        var rect = el.getBoundingClientRect();
        var insertionPoint = true;
        //We will only insert before if the 'X' is to the left of the horizontal center
        //AND the 'y' is above the vertical center.
        if ((eventX < rect.left + (rect.width / 2)) && (eventY < rect.top + (rect.height / 2)))
            insertionPoint = false;
        return insertionPoint;
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