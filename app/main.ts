// main entry point

//import 'jquery';
//import 'jqueryui';
//import 'hammerjs';

//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { AppModule } from './app.module';

//platformBrowserDynamic().bootstrapModule(AppModule);

import { platformBrowser} from '@angular/platform-browser';
import { AppModuleNgFactory } from '../dist/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);