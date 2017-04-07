/**
 * Created by 10206545 on 2016/11/29.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CellComponent} from './components/cell/cell.component';
import {CKboxComponent} from './components/checkboxControl/checkbox.component';
import {DetailControlComponent} from './components/detailControl/detail.component';
import {FilterComponent} from './components/filter/filter.component';
import {GlobalFilterComponent} from './components/globalFilter/global-filter.component';
import {PagerComponent} from './components/pager/pager.component';
import {TitleComponent} from './components/title/title.component';
import {SmartTableComponent} from './smart-table.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CellComponent, FilterComponent, PagerComponent, TitleComponent,
    DetailControlComponent, SmartTableComponent, GlobalFilterComponent,
    CKboxComponent
  ],
  exports: [
    CellComponent, FilterComponent, PagerComponent, TitleComponent,
    DetailControlComponent, SmartTableComponent, GlobalFilterComponent,
    CKboxComponent
  ]
})
export class ZenapSmartTableModule {
}
