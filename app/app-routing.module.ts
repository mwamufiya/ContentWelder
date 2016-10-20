import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignerComponent } from './designer/designer.component';
import { ImageChooser } from './asset-chooser/image-chooser.component';
import { FormWidget } from './widgets/widget-form.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/designer',
        pathMatch: 'full'
    },
    {
        path:'designer',
        component: DesignerComponent
    },
    {
        path:'image-chooser',
        component: ImageChooser
    },
    {
        path:'forms',
        component: FormWidget,

    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{}