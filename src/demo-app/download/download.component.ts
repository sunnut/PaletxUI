import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'download.html',
  styleUrls: ['download.css']
})

export class DownloadComponent {
  newContents: any[] = [
    {
      title: '新增按钮',
      content:
          '此组件适用于多个场景，每个场景都做了区分。这里是具体描述文本，请大家多多留言。'
    },
    {
      title: '新增单选框',
      content:
          '此组件适用于多个场景，每个场景都做了区分。这里是具体描述文本，请大家多多留言。'
    }
  ];

  bugFixContents: any[] = [
    {
      title: '修复按钮悬停无效果问题',
      content:
          '此组件适用于多个场景，每个场景都做了区分。这里是具体描述文本，请大家多多留言。'
    },
    {
      title: '修改输入框问题',
      content:
          '此组件适用于多个场景，每个场景都做了区分。这里是具体描述文本，请大�����多多留言。'
    }
  ];
}