import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignerComponent } from './components/designer.component';
import { ImageChooser } from './components/image/image-chooser.component';
import { VideoWidget } from './components/video-widget.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/video',
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
    path:'video',
    component: VideoWidget
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/