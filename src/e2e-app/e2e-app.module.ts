import {NgModule} from '@angular/core';
import {AnimationDriver, BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {PaletxUIModule} from 'paletxUI';

import {E2EApp, Home} from './e2e-app/e2e-app';
import {E2E_APP_ROUTES} from './e2e-app/routes';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(E2E_APP_ROUTES),
    PaletxUIModule,
  ],
  declarations: [
    E2EApp,
    Home,
  ],
  bootstrap: [E2EApp],
  providers: [{provide: AnimationDriver, useValue: AnimationDriver.NOOP}]
})

export class E2eAppModule {
}
