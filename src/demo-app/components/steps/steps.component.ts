/**
 * Created by root on 3/18/17.
 */
import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'demo-steps',
  templateUrl: 'steps.html',
  styleUrls: ['steps.css'],
})

export class PxStepsDemoComponent implements OnInit {
  private items: any[];
  private items1: any[];
  private localActiveIndex: number = 0;
  private localActiveIndexVertical: number = 0;
  private itemLength: number = 0;
  private localActiveIndexVerticalCustom: number = 0;
  code: string =
      ` <px-steps [activeIndex]="localActiveIndex" [model]="items"></px-steps>
  <px-button [type]="'confirm'" (click)="localActiveIndex=localActiveIndex+1">下一步</px-button>
  <px-button [type]="'cancel'" (click)="localActiveIndex=localActiveIndex-1">上一步</px-button>`;
  codeVeritcal: string =
      `<px-steps  [horizon]="false"  [activeIndex]="localActiveIndexVertical" [model]="items"></px-steps>
   <px-button [type]="'confirm'" (click)="localActiveIndexVertical=localActiveIndexVertical+1">下一步</px-button>
  <px-button [type]="'cancel'" (click)="localActiveIndexVertical=localActiveIndexVertical-1">上一步</px-button>`;
  codeVerticalCustom: string = `
    <px-steps  [horizon]="false"  [activeIndex]="localActiveIndexVertical" [model]="items" [customStyles]="'height:100px'"></px-steps>
  <px-button [type]="'confirm'" (click)="localActiveIndexVertical=localActiveIndexVertical+1">下一步</px-button>
  <px-button [type]="'cancel'" (click)="localActiveIndexVertical=localActiveIndexVertical-1">上一步</px-button>`;

  codeModel: string = `this.items = [
      {label: '基本信息'},
      {label: '附加信息'},
      {label: '高级设置'},
      {label: '构建成功'},
      {label: '最终结束'}
    ];`;

  ngOnInit() {
    this.localActiveIndex = 0;
    this.localActiveIndexVertical = 0;
    this.localActiveIndexVerticalCustom = 0;
    this.items = [
      {label: '基本信息'}, {label: '附加信息'}, {label: '高级设置'},
      {label: '构建成功'}, {label: '最终结束'}
    ];
    this.items1 = [
      {label: '基本信息'}, {label: '附加信息'}, {label: '高级设置'},
      {label: '构建成功'}
    ];
    this.itemLength = (this.items).length - 1;
  }
}
