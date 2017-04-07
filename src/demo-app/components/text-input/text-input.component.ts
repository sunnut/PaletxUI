import {Component} from '@angular/core';

@Component({moduleId: module.id, templateUrl: 'text-input.html'})

export class PxTextInputDemoComponent {
  textInput: string = '';
  numberInput: number = 0;
  numberWithUnitInput: number = 0;
  passwordInput: string = '';
  telInput: string = '';
  inputContent: string = '';
  urlInput: string = '';
  cascadingInput1: string = '';
  cascadingInput2: string = '';
  cascadingInput3: string = '';

  inputCode: string =
      `文本：<px-text-input [(ngModel)]="textInput" required></px-text-input>
密码：<px-text-input type="password" [(ngModel)]="passwordInput" required></px-text-input>
单位组合：<px-text-input type="number" [(ngModel)]="numberWithUnitInput" precision="2" unit="unit" required></px-text-input>
数字：<px-text-input type="number" [(ngModel)]="numberInput" placeholder="输入数字" shortInput required></px-text-input>
电话号码：<px-text-input type="tel" [(ngModel)]="telInput" placeholder="手机号码" maxLength="11" required></px-text-input>
网址：<px-text-input type="text" [(ngModel)]="urlInput" prefix="https://"></px-text-input>
级联框：
<div class="cascading-input">
     <px-text-input  [(ngModel)]="cascadingInput1" shortInput notShowOption></px-text-input>
     <px-text-input  [(ngModel)]="cascadingInput2" shortInput notShowOption></px-text-input>
     <px-text-input  [(ngModel)]="cascadingInput3" shortInput notShowOption></px-text-input>
</div>`;

  textareaCode: string =
      `<px-textarea [(textContext)]="inputContent" maxContext="200"></px-textarea>`;
}
