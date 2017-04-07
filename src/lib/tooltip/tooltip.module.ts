import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PxTooltipDirective} from './tooltip.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PxTooltipDirective],
  exports: [PxTooltipDirective]
})

export class PxTooltipModule {
}
