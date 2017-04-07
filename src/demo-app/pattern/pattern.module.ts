import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

import {PxFormDemoComponent} from './form/form.component';
import {PxPatternNavComponent} from './nav/nav.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  declarations: [PxPatternNavComponent, PxFormDemoComponent],
  exports: [PxPatternNavComponent]
})

export class PxPatternDemoModule {
}