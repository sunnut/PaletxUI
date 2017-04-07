import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from 'ng2-translate/ng2-translate';

import {PxTabMenuComponent} from './tabmenu.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [PxTabMenuComponent],
  declarations: [PxTabMenuComponent]
})
export class PxTabMenuModule {
}
