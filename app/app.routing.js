"use strict";
var router_1 = require('@angular/router');
var designer_component_1 = require('./components/designer.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/designer',
        pathMatch: 'full'
    },
    {
        path: 'designer',
        component: designer_component_1.DesignerComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=app.routing.js.map