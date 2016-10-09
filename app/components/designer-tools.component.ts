import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesignerGlobalsService } from '../services/designer-globals.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'designer-tools',
  templateUrl: './app/components/designer-tools.component.html',
  styleUrls: ['./app/components/designer-tools.component.css']
})
export class DesignerToolsComponent implements OnInit{
  private activeToolSelection: string;
  private _selectedItemSubscription: Subscription;
  constructor(
    private router: Router,
    private designerGlobals: DesignerGlobalsService){
       
    }

  ngOnInit(){
    //subscribe to be alerted when an item is selected, so the tool menu can be hidden
    //TODO: there probably is a better way of doing this in a more direct fashion to minimize overhead of observables
    this._selectedItemSubscription = this.designerGlobals.getSelectedItemsObservable().subscribe(
      value => this.activeToolSelection = null
    );
  }

  //set activeToolSelection
  setActiveToolSelection(selection:string):void{
    if(this.activeToolSelection != selection)
      this.activeToolSelection = selection;
    else
      this.activeToolSelection = null;
  }
}