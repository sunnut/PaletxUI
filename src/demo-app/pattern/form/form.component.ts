import {Component} from '@angular/core';

@Component({moduleId: module.id, templateUrl: 'form.html'})

export class PxFormDemoComponent {
  checkboxValue: boolean = false;
  showAdvance: boolean = false;
  isLoading: boolean = false;
  imageName: string = '';
  imageVersion: string = '';
  public formHtmlCode: string = `<form novalidate #form1="ngForm">
        <div class="form-group">
            <span class="form-group-left">镜像名称：</span>
            <px-text-input class="form-group-right" [(ngModel)]="imageName" name="imageName" placeholder="placerholder"
                           hintLabel="镜像名称提示" #name="ngModel" minlength="4" maxlength="10" required>
            </px-text-input>
            <div *ngIf="name.errors && name.dirty && name.touched"
                 class="form-error">
                <div [hidden]="!name.errors.required">
                    Name is required
                </div>
                <div [hidden]="!name.errors.minlength">
                    Name must be at least 4 characters long.
                </div>
                <div [hidden]="!name.errors.maxlength">
                    Name cannot be more than 10 characters long.
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="form-group-left">版本号：</label>
            <px-text-input class="form-group-right" [(ngModel)]="imageVersion" name="imageVersion"
                           placeholder="placerholder" hintLabel="镜像版本号不能为空,必须符合正则式" #version="ngModel"
                           pattern="^([a-z]|[A-Z]|[0-9]){1}([a-z]|[0-9]|[A-Z]|[_]|[-]|[.]){0,63}$" required>
            </px-text-input>
            <div *ngIf="version.errors && version.dirty && version.touched"
                 class="form-error">
                <div [hidden]="!version.errors.required">
                    version is required
                </div>
                <div [hidden]="!version.errors.pattern">
                    version must be match pattern.
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="form-group-left"></label>
            <px-checkbox class="form-group-right">发布为公共镜像</px-checkbox>
        </div>
        <div class="form-group">
            <label class="form-group-left"></label>
            <div class="form-group-button">
                <px-button [type]="'confirm'" *ngIf="!isLoading" [disabled]="form1.invalid">上传</px-button>
                <px-button [type]="'confirm'" *ngIf="isLoading">上传中</px-button>
                <px-button [type]="'cancel'" [disabled]="isLoading">取消</px-button>
            </div>
        </div>
    </form>`;

  public formLabelStyleCode: string =
      `  .form-group-left, .form-group-left label {
    width: 200px;
  }

  .form-group-right {
    width: calc(100% - 210px);
  }`;
}