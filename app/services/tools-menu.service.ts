export const MAIN_MENU = {
    "tools":[
        {
            "value": "background",
            "label":"Bkg",
            "isActive": true,
            "items":[
                {
                    "value": "color",
                    "label": "Color"
                },
                {
                    "value": "image",
                    "label": "Image"
                },
                {
                    "value": "video",
                    "label": "Video",
                    "isActive": true,
                    "click": "editBackground('video')",
                    "icon": "video play outline icon"
                }
            ]
        },
        {
            "value":"basic",
            "label":"Basic",
            "isActive": true,
            "items":[
                {
                    "value":"text",
                    "label": "Text",
                    "title": "Text Box",
                    "items":[
                        {
                            "value":"textbox",
                            "label": "Text",
                            "title": "Text Box",
                            "isActive": true,
                            "draggable": true,
                            "icon": "image icon",
                            "widgetConfig":{
                                "type": "image"
                            }
                        },
                        {
                            "value":"heading",
                            "label": "Heading",
                            "title": "Heading",
                            "isActive": false,
                            "draggable": true,
                            "icon": "image icon",
                            "widgetConfig":{
                                "type": "heading"
                            }
                        },
                        {
                            "value":"image",
                            "label": "Image",
                            "isActive": true,
                            "draggable": true,
                            "icon": "image icon",
                            "widgetConfig":{
                                "type": "image"
                            }
                        }
                    ]
                },
                {
                    "value":"container",
                    "label": "Container",
                    "title": "Container",
                    "items":[
                        {
                            "value":"box",
                            "label": "Box",
                            "title": "Box",
                            "isActive": true,
                            "draggable": true,
                            "icon": "image icon",
                            "widgetConfig":{
                                "type": "box"
                            }
                        }
                    ]
                }
            ]
        },
        {
            "value":"media",
            "label":"Media",
            "isActive": true,
            "items":[
                {
                    "value":"video",
                    "label": "Video",
                    "title": "Video",
                    "isActive": true,
                    "draggable": true,
                    "icon": "video play outline icon",
                    "widgetConfig":{
                        "type": "video"
                    }
                },
                {
                    "value":"video",
                    "label": "YoutTube",
                    "title": "YoutTube",
                    "isActive": false,
                    "draggable": true,
                    "icon": "video play outline icon",
                    "widgetConfig":{
                        "type": "video",
                        "source":"youtube"
                    }
                },
                {
                    "value":"video",
                    "label": "Vimeo",
                    "title": "Vimeo",
                    "isActive": false,
                    "draggable": true,
                    "icon": "video play outline icon",
                    "widgetConfig":{
                        "type": "video",
                        "source":"vimeo"
                    }
                }
            ]
        },
        {
            "value":"datasource",
            "label":"Data",
            "isActive": false,
            "items":[
                {
                    "value":"internaldata",
                    "label": "Internal",
                    "title": "Internal",
                    "isActive": false,
                    "draggable": true,
                    "widgetConfig":{
                        "type": "internaldatasource"
                    }
                },
                                {
                    "value":"externaldata",
                    "label": "External",
                    "title": "External",
                    "isActive": false,
                    "draggable": true,
                    "widgetConfig":{
                        "type": "externaldatasource"
                    }
                }
            ]
        },
        {
            "value":"gallery",
            "label":"Gallery",
            "isActive": false,
            "items":[
                {
                    "value":"slideshow",
                    "label": "SlideShow",
                    "title": "SlideShow",
                    "isActive": false,
                    "draggable": true,
                    "widgetConfig":{
                        "type": "slideshow"
                    }
                }
            ]
        },
        {
            "value":"forms",
            "label":"Forms",
            "isActive": false,
            "items":[
                {
                    "value":"custom",
                    "label": "Custom",
                    "title": "Custom",
                    "isActive": false,
                    "draggable": true,
                    "widgetConfig":{
                        "type": "custom"
                    }
                }
            ]
        }
    ]
};