import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesignerGlobalsService } from '../services/designer-globals.service';

@Component({
  selector: 'designer-tools',
  templateUrl: './app/components/designer-tools.component.html',
  styleUrls: ['./app/components/designer-tools.component.css']
})
export class DesignerToolsComponent{
  private activeToolSelection: string;
  constructor(
    private router: Router,
    designerGlobals: DesignerGlobalsService){
      
    }

  //set activeToolSelection
  setActiveToolSelection(selection:string):void{
    if(this.activeToolSelection != selection)
      this.activeToolSelection = selection;
    else
      this.activeToolSelection = null;
  }
}