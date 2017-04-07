import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {PxButtonComponent} from './button.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [PxButtonComponent],
  exports: [PxButtonComponent]
})

export class PxButtonModule {
}
