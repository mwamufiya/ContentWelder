import { Widget } from '../components/widgets/widget.component';

export interface WidgetResize{
    height:number;
    width:number;
    unit?:string;                //the unit of measurement that the dimensions are in (Future use)
}