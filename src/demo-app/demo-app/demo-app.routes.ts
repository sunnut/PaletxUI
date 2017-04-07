import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PxAlertDemoComponent} from '../components/alert/index';
import {PxBacktopDemoComponent} from '../components/backtop/index';
import {PxBreadcrumbDemoComponent} from '../components/breadcrumb/index';
import {PxButtonDemoComponent} from '../components/button/index';
import {PxBarChartsDemoComponent, PxLineChartsDemoComponent} from '../components/charts/index';
import {PxCheckboxDemoComponent} from '../components/checkbox/index';
import {PxDateTimePickerDemoComponent} from '../components/datetimepicker/datetimepicker.component';
import {PxDropdownMenubarDemoComponent} from '../components/dropdown-menubar/index';
// import {PxSelectDemoComponent} from '../components/select/index';
import {DropdownDemoComponent} from '../components/dropdown/index';
import {DemoModalComponent} from '../components/modal/modal.component';
import {PopUpModalDemoComponent} from '../components/pop-up-modal/pop-up-modal.component';
import {PxProgressDemoComponent} from '../components/progress/index';
import {PxRadioDemoComponent} from '../components/radio/index';
import {PxStepsDemoComponent} from '../components/steps/index';
import {PxComponentsSummaryComponent} from '../components/summary/index';
import {PxTabsDemoComponent} from '../components/tab/index';
import {PxTableDemoComponent} from '../components/table/index';
import {PxTabMenuDemoComponent, PxTabMenuDemoTabConentComponent} from '../components/tabmenu/index';
import {PxTextInputDemoComponent} from '../components/text-input/index';
import {PxTextareaDemoComponent} from '../components/textarea/index';
import {PxTooltipDemoComponent} from '../components/tooltip/index';
import {DownloadComponent} from '../download/index';
import {HomeComponent} from '../home/index';
import {PxFormDemoComponent} from '../pattern/form/form.component';
import {PxColorGuideComponent} from '../style/color/color.component';
import {PxFontGuideComponent} from '../style/font/font.component';
import {PxIconGuideComponent} from '../style/icon/icon.component';
import {PxLayoutGuideComponent} from '../style/layout/layout.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}, {
    path: 'components',
    children: [
      {path: 'summary', component: PxComponentsSummaryComponent},
      {path: 'alert', component: PxAlertDemoComponent},
      {path: 'tooltip', component: PxTooltipDemoComponent},
      {path: 'button', component: PxButtonDemoComponent},
      {path: 'breadcrumb', component: PxBreadcrumbDemoComponent},
      {path: 'progress', component: PxProgressDemoComponent},
      {path: 'select', component: DropdownDemoComponent},
      {path: 'textInput', component: PxTextInputDemoComponent},
      {path: 'modal', component: DemoModalComponent},
      {path: 'popUpModal', component: PopUpModalDemoComponent},
      {path: 'radio', component: PxRadioDemoComponent},
      {path: 'checkbox', component: PxCheckboxDemoComponent},
      {path: 'textarea', component: PxTextareaDemoComponent},
      {path: 'dropdown-menubar', component: PxDropdownMenubarDemoComponent},
      {path: 'tab', component: PxTabsDemoComponent},
      {
        path: 'tabmenu',
        component: PxTabMenuDemoComponent,
        children: [
          {path: 'tabs/:tabName', component: PxTabMenuDemoTabConentComponent}
        ]
      },
      {path: 'steps', component: PxStepsDemoComponent},
      {path: 'backtop', component: PxBacktopDemoComponent},
      {path: 'datetimepicker', component: PxDateTimePickerDemoComponent},
      {path: 'table', component: PxTableDemoComponent},
      {
        path: 'charts',
        children: [
          {path: 'line', component: PxLineChartsDemoComponent},
          {path: 'bar', component: PxBarChartsDemoComponent}
        ]
      }
    ],
  },
  {
    path: 'style',
    children: [
      {path: 'color', component: PxColorGuideComponent},
      {path: 'font', component: PxFontGuideComponent},
      {path: 'icon', component: PxIconGuideComponent},
      {path: 'layout', component: PxLayoutGuideComponent}
    ]
  },
  {
    path: 'pattern',
    children: [
      {path: 'form', component: PxFormDemoComponent},
    ]
  },
  {path: 'download', component: DownloadComponent}
];

export const demoAppRouting: ModuleWithProviders = RouterModule.forRoot(routes);
