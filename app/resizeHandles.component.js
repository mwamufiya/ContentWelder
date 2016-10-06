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
var ResizeHandles = (function () {
    function ResizeHandles() {
    }
    ResizeHandles = __decorate([
        core_1.Component({
            selector: 'designer-resizeHandles',
            template: "\n    <div class=\"resizerTL\"></div>\n    <div class=\"resizerTC\"></div>\n    <div class=\"resizerTR\"></div>\n    <div class=\"resizerCL\"></div>\n    <div class=\"resizerCR\"></div>\n    <div class=\"resizerBL\"></div>\n    <div class=\"resizerBC\"></div>\n    <div class=\"resizerBR\"></div> \n  ",
            styles: ["\n.resizerTL, .resizerTC, .resizerTR, .resizerCL, .resizerCR, .resizerBL, .resizerBC, .resizerBR {\n  position: absolute;\n  height:8px;\n  width:8px;\n  border:1px solid #CCC;\n  background:white;\n}\n.resizerTL, .resizerTC, .resizerTR{\n  top:-5px;\n}\n.resizerBL, .resizerBC, .resizerBR{\n  bottom:-5px;\n}\n.resizerTR, .resizerCR, .resizerBR, .resizerCR{\n  right:-5px;\n}\n.resizerTL, .resizerCL, .resizerBL, .resizerCL{\n  left:-5px;\n}\n.resizerBL, .resizerTR{\n  cursor:nesw-resize;\n}\n.resizerBR, .resizerTL{\n  cursor:nwse-resize;\n}\n.resizerTC, .resizerBC{\n  left:0;\n  right:0;\n  margin:auto;\n  cursor:ns-resize;\n}\n.resizerCL, .resizerCR{\n  margin:auto;\n  top:0;\n  bottom:0;\n  cursor:ew-resize;\n}\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], ResizeHandles);
    return ResizeHandles;
}());
exports.ResizeHandles = ResizeHandles;
//# sourceMappingURL=resizeHandles.component.js.map