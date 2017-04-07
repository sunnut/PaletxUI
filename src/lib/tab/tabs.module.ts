import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {NgTranscludeDirective} from './ng-transclude.directive';
import {PxTabHeadingDirective as TabHeadingDirective} from './tab-heading.directive';
import {PxTabDirective as TabDirective} from './tab.directive';
import {PxTabsetComponent as TabsetComponent} from './tabset.component';
import {PxTabsetConfig as TabsetConfig} from './tabset.config';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective
  ],
  exports: [
    TabDirective, TabsetComponent, TabHeadingDirective, NgTranscludeDirective
  ]
})
export class PxTabsModule {
  public static forRoot(): ModuleWithProviders {
    return {ngModule: PxTabsModule, providers: [TabsetConfig]};
  }
}