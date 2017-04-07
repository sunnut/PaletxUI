import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PxTabsModule} from 'paletxUI/paletxUI';
import {CodeHighlighterModule} from 'primeng/primeng';

import {PxCodeComponent} from './code.component';
import {CssCodeDirective, HtmlCodeDirective, TsCodeDirective} from './code.directive';

@NgModule({
  imports: [CommonModule, PxTabsModule, CodeHighlighterModule],
  declarations:
      [PxCodeComponent, HtmlCodeDirective, TsCodeDirective, CssCodeDirective],
  exports:
      [PxCodeComponent, HtmlCodeDirective, TsCodeDirective, CssCodeDirective]
})

export class PxCodeModule {
}