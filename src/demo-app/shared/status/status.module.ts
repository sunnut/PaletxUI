import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PxStatusBlankComponent} from './status-blank.component';
import {PxStatusDoneComponent} from './status-done.component';
import {PxStatusProgressComponent} from './status-progress.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    PxStatusDoneComponent, PxStatusProgressComponent, PxStatusBlankComponent
  ],
  exports: [
    PxStatusDoneComponent, PxStatusProgressComponent, PxStatusBlankComponent
  ]
})

export class PxStatusModule {
}