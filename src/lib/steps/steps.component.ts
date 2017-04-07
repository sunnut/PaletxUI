import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

import {PXMenuItem} from './step-menu-item-interface';

@Component({
  selector: 'px-steps',
  templateUrl: 'steps.html',
  styleUrls: ['../styles/steps.css'],
})
export class PXSteps implements DoCheck, OnInit {
  @Input() horizon: boolean = true;

  @Input() customStylesVertical: string = '';

  @Input() customStylesHorizon: string = '';

  itemLength: number = 0;

  @Input() activeIndex: number = 0;

  @Input() model: PXMenuItem[];

  @Input() readonly: boolean = true;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() id: string = `px-steps-${this.UUID(16, 16)}`;

  @Output() activeIndexChange: EventEmitter<any> = new EventEmitter();

  private heightOfDynamic: number = 30;

  private widthOfDynamic: number = 386;

  constructor(public router: Router) {}

  setUserInputStyleVertical() {
    if (this.customStylesVertical === null ||
        this.customStylesVertical === '' ||
        this.customStylesVertical === undefined) {
      return;
    } else {
      return JSON.parse(this.ChangeStringToStandard(this.customStylesVertical));
    }
  }
  setUserInputStyleHorizon() {
    if (this.customStylesHorizon === null || this.customStylesHorizon === '' ||
        this.customStylesHorizon === undefined) {
      return;
    } else {
      return JSON.parse(this.ChangeStringToStandard(this.customStylesHorizon));
    }
  }

  setCurrentStylesVertical(height: number) {
    return JSON.parse(this.getStringToJsonVertical(height));
  }

  setCurrentStylesHorizon(width: number) {
    return JSON.parse(this.getStringToJsonHorizon(width));
  }

  getStringToJsonVertical(height: number) {
    let finallyStr;
    if (isNaN(this.heightOfDynamic)) {
      return;
    }
    // the 12px is because the ul > li element has padding-top 4 px
    let result = this.heightOfDynamic - 30 * (this.model.length - 2) -
        24 * this.model.length - 12 + 'px';
    finallyStr = 'height:' + result;
    return this.ChangeStringToStandard(finallyStr);
  }
  getStringToJsonHorizon(width: number) {
    let finallyStr;
    if (isNaN(this.widthOfDynamic)) {
      return;
    }
    let result = this.widthOfDynamic + 'px';
    finallyStr = 'width:' + result;
    return this.ChangeStringToStandard(finallyStr);
  }
  fixBugForPaddingVertical() {
    if (window.navigator.userAgent.indexOf('Firefox') > 0) {
      let finallyStrFirefox = 'padding-top:4px';
      return JSON.parse(this.ChangeStringToStandard(finallyStrFirefox));
    } else {
      // do nothing
    }
  }
  ngOnInit() {
    if (this.activeIndex <= 0) {
      this.activeIndex = 0;
    }
    if (this.activeIndex > this.itemLength) {
      this.activeIndex = this.itemLength;
    }
  }

  ngDoCheck() {
    if (this.activeIndex < 0) {
      this.activeIndex = 0;
    }
    if (this.activeIndex > this.itemLength) {
      this.activeIndex = this.itemLength;
    }
    this.itemLength = this.model.length - 1;
    // if selection :the  below  code is for user custom design the height
    if (this.customStylesVertical === null ||
        this.customStylesVertical === undefined ||
        this.customStylesVertical === '') {
      this.heightOfDynamic = this.getHeight();
      if (this.heightOfDynamic !== null) {
        this.setCurrentStylesVertical(this.heightOfDynamic);
      }
    } else {
      // else selection : the below code is for the Dynamic adaptive  height
      this.setUserInputStyleVertical();
    }

    // if selection :the  below  code is for user custom design the width
    if (this.customStylesHorizon === null ||
        this.customStylesHorizon === undefined ||
        this.customStylesHorizon === '') {
      this.widthOfDynamic = this.getWidth();
      if (this.widthOfDynamic !== null) {
        this.setCurrentStylesHorizon(this.widthOfDynamic);
      }
    } else {
      // else selection : the below code is for the Dynamic adaptive width
      this.setUserInputStyleHorizon();
    }
  }

  get pxStpesId() {
    return this.id;
  }
  // width:50px,height:50px  ==> "{"width":" 50px","height":"50px"}"

  ChangeStringToStandard(inputStr: string): string {
    let inputString = '';
    if (inputStr[(inputStr.length) - 1] === ';') {
      inputString = inputStr.substring(0, (inputStr.length) - 1);
    } else {
      inputString = inputStr;
    }
    let localArrayOfStyle: string = '';
    localArrayOfStyle += '{';
    localArrayOfStyle += '"';
    for (let value of inputString) {
      if (value !== ':' && value !== ';') {
        localArrayOfStyle += value;
      } else if (value === ';') {
        localArrayOfStyle += '"';
        localArrayOfStyle += ',';
        localArrayOfStyle += '"';
      } else if (value === ':') {
        localArrayOfStyle += '"';
        localArrayOfStyle += value;
        localArrayOfStyle += '"';
      }
    }
    localArrayOfStyle += '"';
    localArrayOfStyle += '}';
    return localArrayOfStyle;
  }

  getWidth() {
    let pxInnerDiv = document.getElementById(this.id);
    let parentNodePXStep;
    let grandFather;
    // let parentNodePXStepPos;
    // let grandFatherPos;
    let noNullPxInnerDiv;
    // let pxInnerDivPos;
    let grandFatherPosWidth;
    let grandFatherPosLeft;
    let pxInnerDivPosLeft;

    if (pxInnerDiv !== null && pxInnerDiv.parentNode) {
      noNullPxInnerDiv = pxInnerDiv;
      // pxInnerDivPos = (<Element>noNullPxInnerDiv).getBoundingClientRect();
      pxInnerDivPosLeft =
          (<Element>noNullPxInnerDiv).getBoundingClientRect().left;
      parentNodePXStep = pxInnerDiv.parentNode;
      if (parentNodePXStep !== null &&
          (<Element>parentNodePXStep).getBoundingClientRect()) {
        // parentNodePXStepPos =
        //    (<Element>parentNodePXStep).getBoundingClientRect();
      }
      if (pxInnerDiv.parentNode !== null && pxInnerDiv.parentNode.parentNode) {
        grandFather = pxInnerDiv.parentNode.parentNode;
        if (grandFather !== null &&
            (<Element>grandFather).getBoundingClientRect()) {
          // grandFatherPos = (<Element>grandFather).getBoundingClientRect();
          grandFatherPosLeft =
              (<Element>grandFather).getBoundingClientRect().left;
          grandFatherPosWidth =
              (<Element>grandFather).getBoundingClientRect().width;
        }
      }
    }
    if (!isNaN(grandFatherPosLeft + grandFatherPosWidth - pxInnerDivPosLeft)) {
      return (grandFatherPosLeft + grandFatherPosWidth - pxInnerDivPosLeft) /
          this.model.length;
    } else {
      return null;
    }
  }
  getHeight() {
    let pxInnerDiv = document.getElementById(this.id);
    let parentNodePXStep;
    let grandFather;
    // let parentNodePXStepPos;
    // let grandFatherPos;
    let noNullPxInnerDiv;
    // let pxInnerDivPos;
    let grandFatherPosHeight;
    let grandFatherPosTop;
    let pxInnerDivPosTop;

    if (pxInnerDiv !== null && pxInnerDiv.parentNode) {
      noNullPxInnerDiv = pxInnerDiv;
      // pxInnerDivPos = (<Element>noNullPxInnerDiv).getBoundingClientRect();
      pxInnerDivPosTop =
          (<Element>noNullPxInnerDiv).getBoundingClientRect().top;
      parentNodePXStep = pxInnerDiv.parentNode;
      if (parentNodePXStep !== null &&
          (<Element>parentNodePXStep).getBoundingClientRect()) {
        // parentNodePXStepPos =
        //    (<Element>parentNodePXStep).getBoundingClientRect();
      }
      if (pxInnerDiv.parentNode !== null && pxInnerDiv.parentNode.parentNode) {
        grandFather = pxInnerDiv.parentNode.parentNode;
        if (grandFather !== null &&
            (<Element>grandFather).getBoundingClientRect()) {
          // grandFatherPos = (<Element>grandFather).getBoundingClientRect();
          grandFatherPosHeight =
              (<Element>grandFather).getBoundingClientRect().height;
          grandFatherPosTop =
              (<Element>grandFather).getBoundingClientRect().top;
        }
      }
    }
    if (!isNaN(grandFatherPosTop + grandFatherPosHeight - pxInnerDivPosTop)) {
      return grandFatherPosTop + grandFatherPosHeight - pxInnerDivPosTop;
    } else {
      return null;
    }
  }

  /* tslint:disable */
  UUID(len: any, radix: any) {
    var chars =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
            '');
    var uuid: any[] = [];
    var i: number;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      var r: any;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  }
  /* tslint:enable*/

  // itemClick(event: Event, item: PXMenuItem, i: number) {
  //  if (this.readonly) {
  //    return;
  //  }
  //  this.activeIndexChange.emit(i);
  //
  //  if (item.disabled) {
  //    event.preventDefault();
  //    return;
  //  }
  //
  //  if (!item.url || item.routerLink) {
  //    event.preventDefault();
  //  }
  //
  //  if (item.command) {
  //    if (!item.eventEmitter) {
  //      item.eventEmitter = new EventEmitter();
  //      item.eventEmitter.subscribe(item.command);
  //    }
  //
  //    item.eventEmitter.emit({originalEvent: event, item: item, index: i});
  //  }
  //
  //  if (item.routerLink) {
  //    this.router.navigate(item.routerLink);
  //  }
  //}
}
