import {Component, Input} from '@angular/core';

@Component({
  selector: 'px-button',
  templateUrl: 'button.html',
  styleUrls: ['../styles/button.css']
})

export class PxButtonComponent {
  @Input() type: string;
  @Input() disabled: boolean;
  buttonClass: any = {};
  isShowCreateIcon: boolean = false;

  ngOnInit() {
    let buttonTypeList = [
      'title', 'table-footer', 'create', 'danger', 'cancel', 'confirm',
      'warning', 'normal', 'primary'
    ];

    if (buttonTypeList.indexOf(this.type) > -1) {
      this.buttonClass[`px-${this.type}-button`] = true;
    } else {
      this.buttonClass[`px-common-button`] = true;
    }

    if (this.type == 'create') {
      this.isShowCreateIcon = true;
    }
  }
}
