import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'px-loading-demo',
  templateUrl: 'loading.html'
})

export class PxLoadingDemoComponent {
  loadingCode: string = `<px-loading [type]="'max'"></px-loading>
<px-loading [type]="'medium'"></px-loading>
<px-loading [type]="'min'"></px-loading>`;
}