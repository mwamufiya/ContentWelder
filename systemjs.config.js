/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      services: 'app/services',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/material': 'npm:@angular/material/material.umd.js',
      // other libraries
      'rxjs':                                     'npm:rxjs',
      'angular-in-memory-web-api':                'npm:angular-in-memory-web-api',
      'jquery':                                   'npm:jquery/dist/jquery.min.js',
      'jqueryui':                                 'npm:jquery-ui-dist/jquery-ui.min.js',
      'moment':                                   'npm:moment/moment.js',
      'ng2-bootstrap':              'npm:ng2-bootstrap',
      'angular2-color-picker':                    'npm:angular2-color-picker',
      'hammerjs':                                 'npm:hammerjs/hammer.min.js',
      'rollup':                                   'npm:rollup',
      'rollup-plugin-node-resolve':               'npm:rollup-plugin-node-resolve',
      'rollup-plugin-commonjs':                   'npm:rollup-plugin-commonjs',
      'rollup-plugin-uglify':                     'npm:rollup-plugin-uglify'

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-bootstrap': {
        main: '/bundles/ng2-bootstrap.umd.js',
        defaultExtension: 'js'
      },
      'angular2-color-picker': {
          main:'index.js', 
          defaultExtension: 'js'
      }
    }
  });
})(this);