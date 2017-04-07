import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PxCardComponent} from './card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PxCardComponent],
  exports: [PxCardComponent]
})

export class PxCardModule {
}
