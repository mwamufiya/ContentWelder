import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MakeDraggable } from '../directives/make-draggable.directive'

@Component({
  selector: 'my-designer',
  templateUrl: './app/components/designer.component.html',
  styleUrls: ['./app/components/designer.component.css']
})
export class DesignerComponent implements OnInit {
    constructor(
    private router: Router){}

    ngOnInit() {
    }
}