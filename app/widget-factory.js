"use strict";
var text_widget_component_1 = require('./text-widget.component');
var image_widget_component_1 = require('./image-widget.component');
var WidgetFactory = (function () {
    function WidgetFactory() {
    }
    WidgetFactory.prototype.createWidget = function (viewContainer, componentFactoryResolver, widgetType, config) {
        var componentFactory;
        switch (widgetType) {
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