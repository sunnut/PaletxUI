import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'px-status-progress',
  template: `<span class="status">
        <span>...</span><span>进行中</span>
    </span>`,
  styleUrls: ['status.css']
})

export class PxStatusProgressComponent {
}