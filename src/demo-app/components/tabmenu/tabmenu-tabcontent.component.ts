import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component(
    {changeDetection: ChangeDetectionStrategy.OnPush, template: 'tab content'})
export class PxTabMenuDemoTabConentComponent {
  public tabName: string;
  constructor(private activatedRoute: ActivatedRoute) {
    this.tabName = this.activatedRoute.snapshot.params['tabName'];
  }
}
