import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ZenapSmartTableModule} from './smart-table/index';
import {PxTableComponent} from './table.component';

@NgModule({
  imports: [CommonModule, FormsModule, ZenapSmartTableModule],
  declarations: [PxTableComponent],
  exports: [PxTableComponent]
})

export class PxTableModule {
}
