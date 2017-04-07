import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import {PxBreadcrumbComponent} from './breadcrumb.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [PxBreadcrumbComponent],
  exports: [PxBreadcrumbComponent]
})

export class PxBreadcrumbModule {
}