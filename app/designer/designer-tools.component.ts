import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';
import {MAIN_MENU } from '../services/tools-menu.service'

@Component({
  moduleId: module.id,
  selector: 'designer-tools',
  templateUrl: 'designer-tools.component.html',
  styleUrls: ['designer-tools.component.css'],
  outputs: ['changeBkgEmitter']
})
export class DesignerToolsComponent implements OnInit{
  private activeToolSelection: string;
  private changeBkgEmitter:EventEmitter<any> = new EventEmitter();
  private _selectedItemSubscription: Subscription;
  private menuJSON:JSON;                    //Holds the JSON representation of the menu

  /**
   * @class
   * @param {Router} router
   * @param {DesignerGlobalsService} designerGlobals
   */
  constructor(
    private router: Router,
    private designerGlobals: DesignerGlobalsService){
      this.menuJSON = JSON.parse(JSON.stringify(MAIN_MENU));
    }

  ngOnInit(){
    //subscribe to be alerted when an item is selected, so the tool menu can be hidden
    //TODO: there probably is a better way of doing this in a more direct fashion to minimize overhead of observables
    this._selectedItemSubscription = this.designerGlobals.getSelectedItemsObservable().subscribe(
      value => this.activeToolSelection = null
    );
  }

  /**
   * @function
   * @param {string} selection
   * @description sets the currently selected tool group , so that the tool panels know which to expand
   */
  setActiveToolSelection(selection?:string):void{
    if(this.activeToolSelection != selection)
      this.activeToolSelection = selection;
    else
      this.activeToolSelection = null;
  }
  /**
   * @function
   * @param {string} changeType
   * @description Calls for the corresponding Editor to be activated
   */
  editBackground(changeType){
    this.setActiveToolSelection();
    this.changeBkgEmitter.emit({
      changeType: changeType
    });
  }
  /**
   * @function
   * @param {Widget} item
   * @returns {string}
   * @description return string version of json because Template doesn't have access to "JSON.stringify"
   */
  templateJsonStringify(item):string{
    return item.widgetConfig? JSON.stringify(item.widgetConfig): '';
  }
}