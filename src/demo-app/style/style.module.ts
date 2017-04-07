import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {PxColorGuideComponent} from './color/color.component';
import {PxFontGuideComponent} from './font/font.component';
import {PxIconGuideComponent} from './icon/icon.component';
import {PxLayoutGuideComponent} from './layout/layout.component';
import {PxStyleNavComponent} from './nav/nav.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [
    PxStyleNavComponent, PxColorGuideComponent, PxFontGuideComponent,
    PxIconGuideComponent, PxLayoutGuideComponent
  ],
  exports: [PxStyleNavComponent]
})

export class PxStyleDemoModule {
}