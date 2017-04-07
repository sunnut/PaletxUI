import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'px-status-blank',
  template: `<span class="status">
        <span>--</span><span>N/A</span>
    </span>`,
  styleUrls: ['status.css']
})

export class PxStatusBlankComponent {
}