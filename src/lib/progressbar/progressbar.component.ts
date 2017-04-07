import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'px-progressbar',
  templateUrl: 'progressbar.html',
  styleUrls: ['../styles/progressbar.css']
})
export class PxProgressBarComponent implements OnInit {
  private _percentage: number|string;
  @Input() type: string;
  @Input() bartype: string;

  progress: any = {};
  progressbar: any = {};

  @Input()
  get percentage(): number|string {
    return this._percentage;
  }

  set percentage(value) {
    this._percentage = value + '%';
    if (value === 100) {
      this.progressbar[`px-progress-bar-success`] = true;
    }
  }

  ngOnInit() {
    let typeList = ['page', 'table'];
    let bartypeList = ['success', 'info', 'warning'];

    if (typeList.indexOf(this.type) > -1) {
      this.progress[`px-progress-${this.type}`] = true;
    } else {
      this.progress[`px-progress-page`] = true;
    }

    if (bartypeList.indexOf(this.bartype) > -1) {
      this.progressbar[`px-progress-bar-${this.bartype}`] = true;
    } else {
      this.progressbar[`px-progress-bar-info`] = true;
    }
  }
}
