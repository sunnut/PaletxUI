import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'px-status-done',
  template: `<span class="status">
        <span class="icon icon-done"></span><span>完成</span>
    </span>`,
  styleUrls: ['status.css']
})

export class PxStatusDoneComponent {
}