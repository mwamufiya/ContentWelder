import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'designer-tools',
  templateUrl: 'app/designer-tools.component.html',
  styleUrls: ['app/designer-tools.component.css']
})
export class DesignerToolsComponent implements OnInit {
    constructor(
    private router: Router){}

    ngOnInit() {
    }
}