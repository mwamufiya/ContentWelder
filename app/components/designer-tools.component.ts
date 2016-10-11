import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';
import { DesignerToolsMenu } from './designer-tools-menu.component';
import {MAIN_MENU } from '../services/tools-menu.service'

@Component({
  selector: 'designer-tools',
  templateUrl: './app/components/designer-tools.component.html',
  styleUrls: ['./app/components/designer-tools.component.css'],
  outputs: ['changeBkgEmitter']
})
export class DesignerToolsComponent implements OnInit{
  private activeToolSelection: string;
  private changeBkgEmitter:EventEmitter<any> = new EventEmitter();
  private _selectedItemSubscription: Subscription;
  private menuJSON:JSON;                    //Holds the JSON representation of the menu 
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

  //set activeToolSelection
  setActiveToolSelection(selection?:string):void{
    if(this.activeToolSelection != selection)
      this.activeToolSelection = selection;
    else
      this.activeToolSelection = null;
  }
  //Calls for the corresponding Editor to be activated
  editBackground(changeType){
    this.setActiveToolSelection();
    this.changeBkgEmitter.emit({
      changeType: changeType
    });
  }
  //return string version of json because Template doesn't have access to "JSON.stringify"
  templateJsonStringify(item):string{
    return item.widgetConfig? JSON.stringify(item.widgetConfig): '';
  }
}