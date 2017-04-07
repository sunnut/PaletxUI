/**
 * Created by 10190264 on 2016/12/15.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PxButtonModule} from '../button/index';

import {PxModalComponent} from './modal.component';

@NgModule({
  imports: [CommonModule, PxButtonModule],
  declarations: [PxModalComponent],
  exports: [PxModalComponent]
})

export class PxModalModule {
}
