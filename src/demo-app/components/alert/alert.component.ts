import {Component} from '@angular/core';

@Component({moduleId: module.id, templateUrl: 'alert.html'})

export class PxAlertDemoComponent {
  alertCode: string =
      `<px-alert type="success" class="px-alert-on-top" [(show)]="successAlertShow">操作成功，3秒后通知自动消失</px-alert>
<px-alert type="warning" class="px-alert-on-top" [(show)]="warningAlertShow">警告消息</px-alert>
<px-alert type="error" class="px-alert-on-top" [(show)]="errorAlertShow">错误消息</px-alert>`;

  successAlertShow: boolean = false;
  warningAlertShow: boolean = false;
  errorAlertShow: boolean = false;
}
