import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'summary.html',
  styleUrls: ['summary.css']
})

export class PxComponentsSummaryComponent {
  submitNeeds() {
    window.open('http://wiki.zte.com.cn/pages/viewpage.action?pageId=34857090');
  }
}
