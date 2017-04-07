import {Component} from '@angular/core';
import {PxButtonState} from 'paletxUI/paletxUI';

@Component({
  moduleId: module.id,
  selector: 'demo-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.css'],
})

export class PxButtonDemoComponent {
  public myButtonState: number = PxButtonState.DOING;
  pcode1: string =
      `<button pxButton type="text" class="ui-button-success" icon="plus" label="常用操作"></button>
<button pxButton type="text" class="ui-button-success ui-button-sm" icon="plus" label="常用操作"></button>
<button [type]="'create'">常用操作</px-button>`;
  pcode2: string =
      `<button pxButton type="text" class="ui-button-primary" label="确认" ></button>
<button pxButton type="text" class="ui-button-info" label="取消" ></button>
<button pxButton type="text" class="ui-button-primary ui-button-sm" label="确认" ></button>
<button pxButton type="text" class="ui-button-info ui-button-sm" label="取消" ></button>
<px-button [type]="'confirm'">确认</px-button>
<px-button [type]="'cancel'">取消</px-button>`;
  pcode3: string =
      `<button pxButton type="text" class="ui-button-danger" label="删除" ></button>
<button pxButton type="text" class="ui-button-info" label="取消" ></button>
<button pxButton type="text" class="ui-button-danger ui-button-sm" label="删除" ></button>
<button pxButton type="text" class="ui-button-info ui-button-sm" label="取消" ></button>
<px-button [type]="'danger'">删除</px-button>
 <px-button [type]="'cancel'">取消</px-button>`;
  pcode4: string =
      `<button pxButton type="text" class="ui-button-primary" label="确认" [disabled]="true"></button>
<button pxButton type="text" class="ui-button-info" label="取消" ></button>
<button pxButton type="text" class="ui-button-primary ui-button-sm" label="确认" [disabled]="true"></button>
<button pxButton type="text" class="ui-button-info ui-button-sm" label="取消" ></button>
<px-button [type]="'cancel'" [disabled]=true>取消</px-button>
<px-button [type]="'cancel'" >取消</px-button>`;
  pcode5: string = `import {PxButtonState} from 'paletxUI/paletxUI';
public myButtonState: number = PxButtonState.DOING;
<button pxButton [state]="myButtonState" type="text" class="ui-button-success" icon="plus" label="常用操作"></button>
<button pxButton [state]="myButtonState" type="text" class="ui-button-success ui-button-sm" icon="plus" label="常用操作"></button>
do() {
    this.myButtonState = PxButtonState.DOING;
    // http requests, timeout, etc.
    this.myButtonState = PxButtonState.SUCCESS;
}
`
  pcode6: string =
      `<button pxButton type="text" class="ui-button-info" label="表格操作" ></button>
<button pxButton type="text" class="ui-button-info ui-button-sm" label="表格操作" ></button>
<px-button [type]="'table-footer'">表格操作</px-button>`;
  pcode7: string =
      `<button pxButton type="text" class="ui-button-info" label="表格操作" ></button>
<button pxButton type="text" class="ui-button-info ui-button-sm" label="表格操作" ></button>
<px-button [type]="'title'" >标题旁</px-button>`;
  pcode8: string = `<px-splitButton label="编辑" ></px-splitButton>
<px-splitButton label="编辑" class="ui-splitbutton-sm"></px-splitButton>
items = [
            {label: 'Update', icon: '', command: () => {
                this.update();
            }},
            {label: 'Delete', icon: '', command: () => {
                this.delete();
            }},
            {label: 'Angular.io', icon: '', url: 'http://angular.io'},
            {label: 'Theming', icon: '', routerLink: ['']}
        ];`;
  items: any;
  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: '',
        command: () => {
          this.update();
        }
      },
      {
        label: 'Delete',
        icon: '',
        command: () => {
          this.delete();
        }
      },
      {label: 'Angular.io', icon: '', url: 'http://angular.io'},
      {label: 'Theming', icon: '', routerLink: ['']}
    ];
  }

  save() {}

  update() {}

  delete() {}
}