import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PX_RADIO_DIRECTIVES} from './radio.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PX_RADIO_DIRECTIVES],
  exports: [PX_RADIO_DIRECTIVES]
})

export class PxRadioModule {
}
