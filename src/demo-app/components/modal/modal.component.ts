import {Component, ViewChild} from '@angular/core';

@Component({moduleId: module.id, templateUrl: 'modal.html'})
export class DemoModalComponent {
  @ViewChild('modal1') modal1: any;
  @ViewChild('modal2') modal2: any;
  @ViewChild('modal3') modal3: any;

  style: any = {'width': '600px'};
  demoModalHtml1: string = `
     <px-modal #modal1 [title]="'title1'" [setStyles]="style" (submit)="submitModal1()">
            <div class="px-modal-body">
                <div class="form-group">
                    用户：<input type="text" name="input1">
              </div>
              <div class="form-group">
                    密码：<input type="text" name="input2">
                </div>
            </div>
        </px-modal>

        <px-button [type]="'confirm'" (click)="openModal1()" [disabled]=0>默认按钮弹框</px-button>
    `;
  demoModalTs1: string = `
        @ViewChild('modal1') modal1:any;
        style:any = {'width': '600px'};  //自定义弹框宽度
        openModal1() {
            this.modal1.open = true;
        }

        submitModal1() {
             console.log('submit1');
        }
    `;
  demoModalHtml2: string = `
     <px-modal #modal1 [title]="'title1'" [showDefaultFooter]="false">
            <div class="px-modal-body">
                <div class="form-group">
                    用户：<input type="text" name="input1">
              </div>
              <div class="form-group">
                    密码：<input type="text" name="input2">
                </div>
            </div>
             <div class="px-modal-footer">
                <px-button [type]="'confirm'" (click)="submitModal2()">提交</px-button>
                <px-button [type]="'cancel'" (click)="closeModal2()">取消</px-button>
            </div>
        </px-modal>

        <px-button [type]="'confirm'" (click)="openModal2()" [disabled]=0>自定义按钮弹框</px-button>
    `;
  demoModalTs2: string = `
        @ViewChild('modal2') modal2:any;
        openModal2() {
            this.modal2.open = true;
        }
        closeModal2() {
            this.modal2.open = false;
        }
        submitModal2() {
             console.log('submit2');
             this.modal2.open = false;
        }
    `;

  demoModalHtml3: string = `
      <px-modal #modal3 [title]="'删除'" [type]="'exclamation'" [message]="'确认要删除选中项吗？'" [messageDown]="'删除选中项可能导致服务不可用。'" (submit)="submitModal3()">
      </px-modal>

      <px-button [type]="'danger'" (click)="openModal3()" [disabled]=0>删除警告弹框</px-button>
    `;
  demoModalTs3: string = `
        @ViewChild('modal3') modal3:any;
        
        openModal3() {
            this.modal3.open = true;
        }
        submitModal3() {
            console.log('submit3');
            this.modal3.open = false;
        }
    `;

  openModal1() {
    this.modal1.open = true;
  }
  closeModal1() {
    this.modal1.open = false;
  }
  submitModal1() {
    console.log('submit1');
  }

  openModal2() {
    this.modal2.open = true;
  }
  closeModal2() {
    this.modal2.open = false;
  }
  submitModal2() {
    console.log('submit2');
    this.modal2.open = false;
  }

  openModal3() {
    this.modal3.open = true;
  }
  submitModal3() {
    console.log('submit3');
    this.modal3.open = false;
  }
}