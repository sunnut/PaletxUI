import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'px-alert',
  templateUrl: 'alert.html',
  styleUrls: ['../styles/alert.css']
})

export class PxAlertComponent implements OnInit {
  @Input() type: string;
  @Input() disappear: number = 3;
  @Output() showChange = new EventEmitter<boolean>();

  alertClass: any = {};
  _show: boolean = true;

  ngOnInit() {
    this.setnoticeClass();
  }

  private setnoticeClass() {
    let alertClassType = ['success', 'warning', 'error'];

    if (alertClassType.indexOf(this.type) > -1) {
      this.alertClass[`alert-${this.type}`] = true;
    } else {
      this.alertClass[`alert-success`] = true;
    }
  }

  @Input()
  get show(): boolean {
    return this._show;
  }

  set show(isShow: boolean) {
    if (this.type === 'success' && isShow) {
      this._show = true;
      setTimeout(() => this.showChange.emit(false), this.disappear * 1000);
    } else {
      this._show = isShow;
    }
  }

  isNotSuccessType() {
    return this.type !== 'success';
  }

  close() {
    this.showChange.emit(false);
  }
}
