"use strict";
var text_widget_component_1 = require('./text-widget.component');
var image_widget_component_1 = require('./image-widget.component');
var WidgetFactory = (function () {
    function WidgetFactory() {
    }
    //TODO: make the WidgetJson an interface so that the definition is known and can be used in IDE
    //Might have to make it an Object, couldn't figure out a way to export an Interface for re-use
    WidgetFactory.prototype.createWidget = function (viewContainer, componentFactoryResolver, widgetJson) {
        var componentFactory;
        switch (widgetJson.type) {
            case "textbox":
                componentFactory = componentFactoryResolver.resolveComponentFactory(text_widget_component_1.TextWidget);
                break;
            case "image":
                componentFactory = componentFactoryResolver.resolveComponentFactory(image_widget_component_1.ImageWidget);
                break;
            default:
        }
        return componentFactory;
    };
    return WidgetFactory;
}());
exports.WidgetFactory = WidgetFactory;
//# sourceMappingURL=widget-factory.js.map