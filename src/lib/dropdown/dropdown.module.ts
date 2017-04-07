import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {SelectDropdownComponent} from './select-dropdown.component';
import {SelectComponent} from './select.component';

export * from './option.interface';
export * from './select.component';

@NgModule({
  declarations: [SelectComponent, SelectDropdownComponent],
  exports: [SelectComponent],
  imports: [CommonModule, FormsModule]
})
export class DropdownModule {
}
