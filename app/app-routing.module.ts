import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaChooser } from './asset-chooser/media-chooser.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/designer',
        pathMatch: 'full'
    },
    {
        path:'image-chooser',
        component: MediaChooser
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