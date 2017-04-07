import {Directive, TemplateRef} from '@angular/core';

import {PxTabDirective as TabDirective} from './tab.directive';

/** Should be used to mark <template> element as a template for tab heading */
@Directive({selector: '[pxTabHeading]'})
export class PxTabHeadingDirective {
  public templateRef: TemplateRef<any>;

  public constructor(templateRef: TemplateRef<any>, tab: TabDirective) {
    tab.headingRef = templateRef;
  }
}