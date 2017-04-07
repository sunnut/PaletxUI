import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'demo-textarea',
  templateUrl: 'textarea.component.html'
})

export class PxTextareaDemoComponent {
  public inputcontent: string = '';
  public contentNumber: number = 300;

  textareaCode: string =
      `<px-textarea [(textContext)]="inputcontent" [tipContent]="'提示性描述'" [maxContext]="contentNumber"></px-textarea>`;
}
