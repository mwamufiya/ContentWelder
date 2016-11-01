import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignerComponent } from './designer/designer.component';
import { MediaChooser } from './asset-chooser/media-chooser.component';
import { FormWidget } from './widgets/widget-form.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/designer',
    pathMatch: 'full'
  },
  {
    path:'designer/:id',
    component: DesignerComponent
  },
  {
    path:'image-chooser',
    component: MediaChooser
  },
  {
    path:'forms',
    component: FormWidget,

  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/