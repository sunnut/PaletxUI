import {Component} from '@angular/core';

@Component({moduleId: module.id, templateUrl: 'pop-up-modal.html'})
export class PopUpModalDemoComponent {
  popUpDeleteCode: string = `<px-button pxConfirm
           confirmType="danger"
           confirmHeader="删除"
           rejectLabel="取消"
           confirmMessage="我是副标题"
           confirmSubMessage="对操作会产生的结果描述性文字写在这"
           [type]="'cancel'">删除</px-button>`;
  popUpConfirmCode: string = `
  <px-button pxConfirm
           confirmType="confirm"
           confirmHeader="确定"
           rejectLabel="取消"
           confirmMessage="我是副标题"
           confirmSubMessage="对操作会产生的结果描述性文字写在这"
           [type]="'cancel'">默认尺寸</px-button>

  <px-button [type]="'cancel'" (click)="showDialog()">大尺寸</px-button>
  <px-dialog header="操作名称，如编辑属性、数据选取" [(visible)]="display">
      <p>The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's
          wedding.
          His beloved son Michael has just come home from the war, but does not intend to become part of his
          father's business.
          Through Michael's life the nature of the family business becomes clear. The business of the family is
          just like the head of the family,
          kind and benevolent to those who give respect,
          but given to ruthless violence whenever anything stands against the good of the family.</p>
      <px-footer>
          <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
              <button pxButton type="text" class="ui-button-primary" (click)="display=false" label="确认"></button>
              <button pxButton type="text" class="ui-button-info" (click)="display=false" label="取消"></button>
          </div>
      </px-footer>
  </px-dialog>
`;
  popUpConfirmTsCode: string = ` 
  display: boolean = false;

  showDialog() {
    this.display = true;
  }`;
  appHtmlCode: string = `
<px-confirmDialog></px-confirmDialog>

`;
  appModuleCode: string = `import {NgModule} from '@angular/core';
...
import {PxConfirmationService} from 'paletxUI/paletxUI';
@NgModule({
  providers: [PxConfirmationService],
})
export class DemoAppModule {}
`;
  display: boolean = false;

  showDialog() {
    this.display = true;
  }
}