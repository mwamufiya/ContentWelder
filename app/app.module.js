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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
// Imports for loading & configuring the in-memory web api
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var designer_component_1 = require('./designer.component');
var designer_tools_component_1 = require('./designer-tools.component');
var designer_stage_component_1 = require('./designer-stage.component');
var designer_droppable_directive_1 = require('./designer-droppable.directive');
var designer_draggable_directive_1 = require('./designer-draggable.directive');
var resizeable_directive_1 = require('./resizeable.directive');
var widget_component_1 = require('./widget.component');
var text_widget_component_1 = require('./text-widget.component');
var image_widget_component_1 = require('./image-widget.component');
var designer_globals_service_1 = require('./designer-globals.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing,
                http_1.HttpModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                designer_component_1.DesignerComponent,
                designer_tools_component_1.DesignerToolsComponent,
                designer_stage_component_1.DesignerStageComponent,
                designer_draggable_directive_1.DesignerDraggable, designer_droppable_directive_1.DesignerDroppable, resizeable_directive_1.Resizeable,
                text_widget_component_1.TextWidget, widget_component_1.Widget,
                image_widget_component_1.ImageWidget
            ],
            providers: [
                designer_globals_service_1.DesignerGlobalsService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=app.module.js.map