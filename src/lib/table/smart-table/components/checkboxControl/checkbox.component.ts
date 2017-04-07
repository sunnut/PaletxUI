/**
 * Created by 10206545 on 2017/2/21.
 */
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'sif-smart-table-ckbox',
  template: ` <label [class.active]="isChecked" >
                <input type="checkbox" [ngModel]="isChecked" (ngModelChange)="changed($event)" >
                <div class="checkbox-indicator"></div>
              </label>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CKboxComponent {
  @Input() row: any;
  @Input()
  set checkStatus(val: any) {
    this.isChecked = val.status;
  }
  @Input() trIndex: any;
  @Output() statusChanged: EventEmitter<any> = new EventEmitter<any>();
  public isChecked: boolean = false;
  constructor() {}
  changed(val: any) {
    this.isChecked = val;
    this.statusChanged.emit(
        {index: this.trIndex, status: val, data: this.row.getData()});
  }
}
