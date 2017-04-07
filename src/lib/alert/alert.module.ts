import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PxAlertComponent} from './alert.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PxAlertComponent],
  exports: [PxAlertComponent]
})

export class PxAlertModule {
}
