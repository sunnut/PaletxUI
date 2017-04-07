import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../../shared/shared.module';

import {InnerOperationComponent} from './operation.component';
import {SmInnerOperationComponent} from './small-operation.component';
import {PxTableDemoComponent} from './table.component';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule],
  declarations: [
    PxTableDemoComponent, InnerOperationComponent, SmInnerOperationComponent
  ],
  exports: [PxTableDemoComponent],
  entryComponents: [InnerOperationComponent, SmInnerOperationComponent]
})

export class PxTableDemoModule {
}
