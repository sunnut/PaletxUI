import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import {PxConfirmationService} from 'paletxUI/paletxUI';

import {PxComponentsDemoModule} from '../components/components.module';
import {DownloadModule} from '../download/index';
import {HomeComponent} from '../home/index';
import {PxPatternDemoModule} from '../pattern/pattern.module';
import {SharedModule} from '../shared/shared.module';
import {PxStyleDemoModule} from '../style/style.module';

import {DemoAppComponent} from './demo-app.component';
import {demoAppRouting} from './demo-app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    demoAppRouting,
    SharedModule,
    PxComponentsDemoModule,
    PxStyleDemoModule,
    PxPatternDemoModule,
    DownloadModule,
    TranslateModule.forRoot(),
  ],
  declarations: [
    DemoAppComponent,
    HomeComponent,
  ],
  providers: [PxConfirmationService],
  bootstrap: [DemoAppComponent],
})

export class DemoAppModule {
}
