export interface DesignerToolsMenuInterface{
    value:string;
    label:string;
    title:string;
    isActive:boolean;
    click:string;
    icon:string;
    draggable:boolean;
    widgetConfig:Object;
    children:Array<DesignerToolsMenuInterface>;
}