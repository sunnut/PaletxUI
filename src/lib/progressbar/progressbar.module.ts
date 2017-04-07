/**
 * Created by 10156312 on 2016/12/15.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PxProgressBarComponent} from './progressbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PxProgressBarComponent],
  exports: [PxProgressBarComponent]
})

export class PxProgressModule {
}
