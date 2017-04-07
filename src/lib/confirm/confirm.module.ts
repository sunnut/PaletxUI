import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import {ConfirmDialogModule, SharedModule} from 'primeng/primeng';

import {PxButtonModule} from '../pxbutton/index';

import {PxConfirmDialogComponent} from './confirm-dialog.component';
import {PxConfirmDirective} from './confirm.directive';

@NgModule({
  imports: [
    CommonModule, SharedModule, ConfirmDialogModule, PxButtonModule,
    TranslateModule
  ],
  declarations: [PxConfirmDialogComponent, PxConfirmDirective],
  exports: [PxConfirmDialogComponent, PxConfirmDirective]
})
export class PxConfirmModule {
}
