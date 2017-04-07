import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'inner-operation',
  template:
      `<button pxButton type="text" class="ui-button-info" label="操作" (click)="show()"></button>`
})

export class InnerOperationComponent {
  private data: any;

  constructor(private cd: ChangeDetectorRef) {}

  public setParaments(params: any, data: any) {
    this.data = data;
    this.cd.detectChanges();
  }

  show() {
    console.log(JSON.stringify(this.data));
  }
}