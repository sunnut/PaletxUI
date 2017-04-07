import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'px-loading',
  templateUrl: 'loading.html',
  styleUrls: ['../styles/loading.scss']
})
export class PxLoadingComponent implements OnInit {
  @Input() type: string;
  loading: any = {};

  ngOnInit() {
    let typeList = ['max', 'medium', 'min'];
    if (typeList.indexOf(this.type) > -1) {
      this.loading[`px-loading-${this.type}`] = true;
    } else {
      this.loading[`px-loading-max`] = true;
    }
  }
}
