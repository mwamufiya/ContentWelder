import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataviewWidget}    from './widget-dataview.component';
import { FormWidget }    from './widget-form.component';

const moduleRoutes: Routes = [
    { path: 'dataviewwidget', component: DataviewWidget },
    { path:'forms', component: FormWidget}
]

@NgModule({
    imports: [
        RouterModule.forChild(moduleRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class WidgetRoutingModule{ }
