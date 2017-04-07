import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import {ButtonModule} from 'primeng/components/button/button';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';

import {PxDateTimePicker} from './datetimepicker.component';

@NgModule({
  imports: [CommonModule, ButtonModule, InputTextModule, TranslateModule],
  exports: [PxDateTimePicker, ButtonModule, InputTextModule],
  declarations: [PxDateTimePicker]
})
export class PxDateTimePickerModule {
}
