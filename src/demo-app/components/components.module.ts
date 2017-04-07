import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ButtonModule, SplitButtonModule} from 'primeng/primeng';

import {SharedModule} from '../shared/shared.module';

import {PxAlertDemoComponent} from './alert/index';
import {PxBacktopDemoComponent} from './backtop/index';
import {PxBreadcrumbDemoComponent} from './breadcrumb/index';
import {PxButtonDemoComponent} from './button/index';
import {PxBarChartsDemoComponent, PxLineChartsDemoComponent} from './charts/index';
import {PxCheckboxDemoComponent} from './checkbox/index';
import {PxDateTimePickerDemoComponent} from './datetimepicker/datetimepicker.component';
import {PxDropdownMenubarDemoComponent} from './dropdown-menubar/index';
import {DropdownDemoComponent} from './dropdown/index';
import {PxLoadingDemoComponent} from './loading/index';
import {DemoModalComponent} from './modal/modal.component';
import {PxComponentsNavComponent} from './nav/index';
import {PxNavigationDemoComponent} from './navigation/index';
import {PopUpModalDemoComponent} from './pop-up-modal/pop-up-modal.component';
import {PxProgressDemoComponent} from './progress/index';
import {PxProgressbarDemoComponent} from './progressbar/index';
import {PxRadioDemoComponent} from './radio/index';
import {PxStepsDemoComponent} from './steps/index';
import {PxComponentsSummaryComponent} from './summary/index';
import {PxTabsDemoComponent} from './tab/index';
import {PxTableDemoModule} from './table/index';
import {PxTabMenuDemoComponent, PxTabMenuDemoTabConentComponent} from './tabmenu/index';
import {PxTextInputDemoComponent} from './text-input/index';
import {PxTextareaDemoComponent} from './textarea/index';
import {PxTooltipDemoComponent} from './tooltip/index';

const COMPONENTS_DEMO = [
  PxComponentsNavComponent,       PxComponentsSummaryComponent,
  PxProgressDemoComponent,        PxProgressbarDemoComponent,
  PxTextInputDemoComponent,       DemoModalComponent,
  PxRadioDemoComponent,           DropdownDemoComponent,
  PxBreadcrumbDemoComponent,      PxTextareaDemoComponent,
  PxButtonDemoComponent,          PxCheckboxDemoComponent,
  PxAlertDemoComponent,           PxTabsDemoComponent,
  PxBacktopDemoComponent,

  PxTabMenuDemoComponent,         PxTabMenuDemoTabConentComponent,
  PxDropdownMenubarDemoComponent, PxNavigationDemoComponent,
  PxTooltipDemoComponent,         PopUpModalDemoComponent,
  PxStepsDemoComponent,           PxLoadingDemoComponent,
  PxDateTimePickerDemoComponent,  PxLineChartsDemoComponent,
  PxBarChartsDemoComponent
];

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule, SharedModule, ButtonModule,
    SplitButtonModule, PxTableDemoModule
  ],
  declarations: [COMPONENTS_DEMO],
  exports: [COMPONENTS_DEMO, PxTableDemoModule]
})

export class PxComponentsDemoModule {
}