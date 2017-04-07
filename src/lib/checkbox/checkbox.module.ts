import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PxCheckboxComponent} from './checkbox.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PxCheckboxComponent],
  exports: [PxCheckboxComponent]
})

export class PxCheckboxModule {
}
