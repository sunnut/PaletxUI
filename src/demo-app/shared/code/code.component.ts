import {AfterContentInit, Component, ContentChild} from '@angular/core';

import {CssCodeDirective, HtmlCodeDirective, TsCodeDirective} from './code.directive';

@Component({
  moduleId: module.id,
  selector: 'px-code',
  templateUrl: 'code.html',
  styleUrls: ['./code.css']
})

export class PxCodeComponent implements AfterContentInit {
  @ContentChild(HtmlCodeDirective) htmlCode: HtmlCodeDirective;
  @ContentChild(TsCodeDirective) tsCode: TsCodeDirective;
  @ContentChild(CssCodeDirective) cssCode: CssCodeDirective;

  ngAfterContentInit() {}
}