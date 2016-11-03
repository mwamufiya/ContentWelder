import { Component, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, OnInit,
    ViewChild, forwardRef, HostListener, OnDestroy } from '@angular/core';

import { DataViewBuilder_I, BuilderConfig } from './dataview-builder.interface';
import { DataViewBuilderService } from './dataview-builder.services';

/**
 * @interface
 * @description used to allow communication between the Display and the Data retrieval
 */
export interface DataGridColumn_I{
    key:string;
    type:string;
    value:string;
}


@Component({
    moduleId: module.id,
    selector: 'data-grid',
    templateUrl: 'data-grid.component.html',
    styleUrls: ['data-grid.component.css'],
    inputs: ['data']
})

export class DataGrid implements OnInit{
    rawData: JSON;
    data:JSON;
    rowList:Array<DataGridColumn_I>;


    constructor(
        private componentFactoryResolver:ComponentFactoryResolver,
        private viewContainer:ViewContainerRef,
        private changeDetectorRef: ChangeDetectorRef,
        private dataService: DataViewBuilderService){

    }

    /**
     * @function
     * @description since Input values are set onInit, if the value is not provided, we initialize it.
     */
    ngOnInit():void {
        this.rowList = this.formatData(this.data, true);
        console.log(this.rowList);
    }

    /**
     * @function
     * @param {JSON} data
     * @returns {Array<DataGridColumn_I>}
     * @description transform JSON into an array so that the template can parse it.
     * TODO this approach will need to be re-evaluated with respect to performance. loading 5000 rows showed problems
     */
    formatData(data, isRoot?:boolean):Array<DataGridColumn_I>{
        let output;

        if(data.constructor.name === 'Array'){
            output = [];
            data.forEach( obj => {
                let arr = [];
                for( let key in obj){
                    arr.push({
                        key: key,
                        type: obj[key].constructor.name.toLowerCase(),
                        value: this.formatData(obj[key])
                    });
                    //output[key] = this.formatData(obj[key])
                    //arr1.push(key, = this.formatData(obj[key]);
                }
                output.push(arr);
            })
        }else if(data.constructor.name === 'Object'){
            output = [];
            for( let key in data){
                output.push({
                    key: key,
                    type: data[key].constructor.name.toLowerCase(),
                    value: this.formatData(data[key])
                });
            }
            // if this is the root, then we nest this item in an array since the data grid is expecting an array
            if(isRoot) output = [output];
        }else{
            output = data;
        }

        return output;

    }

    /**
     * @function
     * @param {number} colIndex
     * @param {string} colKey
     * @description Sorts the data list based on the provide ddata
     */
    toggleSort(colIndex: number, colKey: string):void{
        /*let list = this.rowList;
        list.sort( (a:Array<DataGridColumn_I>, b:Array<DataGridColumn_I>) => {
            let aCol = a[colIndex];
            let bCol = b[colIndex];
            if(aCol.key != colKey){
                return false;
            } else if(!bCol || bCol.key != colKey || aCol.key != bCol.key)
                return true;

            if(aCol.value.constructor.name === 'number' && bCol.value.constructor.name === 'number')
                return aCol.value > bCol.value;
            else
                return aCol.value.localeCompare( bCol.value ) <= 0;
        });

        this.rowList = list;*/
    }

}
