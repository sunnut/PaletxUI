import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PxBacktopComponent} from './backtop.component';


@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [PxBacktopComponent],
  exports: [CommonModule, PxBacktopComponent]
})

export class PxBacktopModule {
}