/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';
import {App} from './app/app';


bootstrapApplication(App, {
  providers: [provideProtractorTestingSupport(),  provideHttpClient(),provideRouter(routeConfig)],
}).catch((err) => console.error(err));