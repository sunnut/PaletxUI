import {ChangeDetectionStrategy, Component} from '@angular/core';

import {PxMenuItem} from 'paletxUI/paletxUI';
import {SelectItem} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'tabmenu-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'tab.demo.html'
})
export class PxTabMenuDemoComponent {
  public tabMenuItems: PxMenuItem[];
  public types: SelectItem[];
  public selectedType: string;
  selectedTypes: string[] = [];

  public tooltipHTMLCode1: string;
  public tooltipTSCode1: string;
  public tooltipHTMLCode2: string;
  public tooltipTSCode2: string;
  public tooltipHTMLCode3: string;
  public tooltipTSCode3: string;

  constructor() {
    this.tabMenuItems = [
      {label: '标签1', routerLink: ['./tabs/Tab1']},
      {label: '标签2', routerLink: ['./tabs/Tab2']},
      {label: '标签3', routerLink: ['./tabs/Tab3']},
      {label: '标签4', routerLink: ['./tabs/Tab4']}
    ];
    this.types = [];
    this.types.push({label: '502MB', value: '502MB'});
    this.types.push({label: '1GB', value: '1GB'});
    this.types.push({label: '2GB', value: '2GB'});
    this.types.push({label: '4GB', value: '4GB'});
    this.types.push({label: '8GB', value: '8GB'});
  }

  ngOnInit() {
    this.tooltipHTMLCode1 = `
    <px-tabMenu [model]="tabMenuItems"></px-tabMenu>
    <router-outlet></router-outlet>
`;
    this.tooltipTSCode1 = `
    import {PxMenuItem} from 'paletxUI/paletxUI';
    public tabMenuItems: PxMenuItem[];
    constructor() {
    this.tabMenuItems = [
      {label: '标签1', routerLink: ['./tabs/Tab1']},
      {label: '标签2', routerLink: ['./tabs/Tab2']},
      {label: '标签3', routerLink: ['./tabs/Tab3']},
      {label: '标签4', routerLink: ['./tabs/Tab4']}
    ];
  }
    `;

    this.tooltipHTMLCode2 = `
    <p-tabView>
            <p-tabPanel header="Header 1">
                Content 1
            </p-tabPanel>
            <p-tabPanel header="Header 2">
                Content 2
            </p-tabPanel>
            <p-tabPanel header="Header 3">
                Content 3
            </p-tabPanel>
        </p-tabView>
`;
    this.tooltipTSCode2 = `
    import {{'{'}}TabViewModule{{'}'}} from &#x27;primeng/primeng&#x27;;
    exports: [ TabViewModule ]
`;
    this.tooltipHTMLCode3 = `
    <p-selectButton [options]="types" [(ngModel)]="selectedType"></p-selectButton>
    <p>{{selectedType}}</p>
`;
    this.tooltipTSCode3 = `
    import {SelectItem} from 'primeng/primeng';
    public types: SelectItem[];
    constructor() {
    this.types = [];
    this.types.push({label: '502MB', value: '502MB'});
    this.types.push({label: '1GB', value: '1GB'});
    this.types.push({label: '2GB', value: '2GB'});
    this.types.push({label: '4GB', value: '4GB'});
    this.types.push({label: '8GB', value: '8GB'});
  }
  `;
  }
}
