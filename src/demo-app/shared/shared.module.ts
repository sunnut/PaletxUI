import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PaletxUIModule} from 'paletxUI/paletxUI';
import {TabViewModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';

import {PxCodeModule} from './code/code.module';
import {PxStatusModule} from './status/status.module';

@NgModule({
  imports: [CommonModule, PaletxUIModule, PxStatusModule, PxCodeModule],
  exports: [
    PaletxUIModule, PxStatusModule, PxCodeModule, TabViewModule,
    SelectButtonModule
  ]
})

export class SharedModule {
}