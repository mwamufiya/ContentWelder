import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignerComponent}    from './designer.component';

const moduleRoutes: Routes = [
    { path: 'designer', component: DesignerComponent },
    { path: 'designer/:id', component: DesignerComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(moduleRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DesignerRoutingModule{ }
