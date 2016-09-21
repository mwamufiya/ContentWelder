import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from './make-draggable.directive'

@Component({
  selector: 'my-designer',
  templateUrl: 'app/designer.component.html',
  styleUrls: ['app/designer.component.css']
})
export class DesignerComponent implements OnInit {
    constructor(
    private router: Router){}

    ngOnInit() {
    }
}