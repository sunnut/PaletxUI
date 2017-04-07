import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'px-modal',
  templateUrl: 'modal.html',
  styleUrls: ['../styles/modal.css', '../styles/button.css']
})
export class PxModalComponent {
  open: boolean = false;

  @Input('showDefaultFooter') showDefaultFooter: boolean = true;
  @Input('showDefaultHeader') showDefaultHeader: boolean = true;
  @Input('title') title: string = 'Title';
  @Input('setStyles') setStyles: any = {};
  @Input('type') type: string = '';
  @Input('message') message: string = '确认要删除选中项吗？';
  @Input('messageDown') messageDown: string = '删除选中项可能导致服务不可用。';
  @Input('warnConfirm') warnConfirm: string = '删除';
  @Input('warnCancel') warnCancel: string = '取消';
  @Output() submit = new EventEmitter<boolean>();

  submitModal() {
    this.submit.emit(false);
    this.open = false;
  }

  closeModal() {
    this.open = false;
  }
}
