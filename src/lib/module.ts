import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {PxAlertModule} from './alert/index';
import {PxBacktopModule} from './backtop/index';
import {PxBreadcrumbModule} from './breadcrumb/index';
import {PxButtonModule as PxPxButtonModule} from './button/index';
import {PxChartsModule} from './charts/index';
import {PxCheckboxModule} from './checkbox/index';
import {PxConfirmModule} from './confirm/index';
import {PxUniqueSelectionDispatcher} from './core/index';
import {PxDateTimePickerModule} from './datetimepicker/index';
import {PxDialogModule} from './dialog/index';
import {DropdownModule} from './dropdown/index';
import {PxLoadingModule} from './loading/index';
import {PxModalModule} from './modal/index';
import {PxProgressModule} from './progressbar/index';
import {PxButtonModule} from './pxbutton/index';
import {PxRadioModule} from './radio/index';
import {PxRadioButtonModule} from './radiobutton/index';
import {PxSplitButtonModule} from './splitbutton/index';
import {PXStepsModule} from './steps/index';
import {PxTabsetConfig, PxTabsModule} from './tab/index';
import {PxTableModule} from './table/index';
import {PxTabMenuModule} from './tabmenu/index';
import {PxTextInputModule} from './text-input/index';
import {PxTextareaModule} from './textarea/index';
import {PxTooltipModule} from './tooltip/index';

const PALETXUI_MODULES = [
  PxRadioModule,          PxButtonModule,   PxProgressModule,
  PxCheckboxModule,       PxLoadingModule,  PxTextInputModule,
  DropdownModule,         PxModalModule,    PxBreadcrumbModule,
  PxTextareaModule,       PxAlertModule,    PxTabsModule,
  PxTooltipModule,        PxConfirmModule,  PxTabMenuModule,
  PXStepsModule,          PxPxButtonModule, PxSplitButtonModule,
  PxBacktopModule,        PxDialogModule,   PxRadioButtonModule,
  PxDateTimePickerModule, PxTableModule,    PxChartsModule
];

@NgModule({
  imports: [PALETXUI_MODULES, FormsModule],
  exports: PALETXUI_MODULES,
  providers: [PxUniqueSelectionDispatcher, PxTabsetConfig],
})

export class PaletxUIModule {
}
