import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'designer-tools',
  templateUrl: 'app/designer-tools.component.html',
  styleUrls: ['app/designer-tools.component.css']
})
export class DesignerToolsComponent{
  private activeToolSelection: string;
  constructor(
  private router: Router){}

  //set activeToolSelection
  setActiveToolSelection(selection:string):void{
    if(this.activeToolSelection != selection)
      this.activeToolSelection = selection;
    else
      this.activeToolSelection = null;
  }
}