import {Component, OnInit} from '@angular/core';


@Component({
  moduleId: module.id,
  templateUrl: 'dropdown.component.html',
  styles: [`
  .displayvalue {
    color: blue;
  }
  .htmlHeight {
    height:130px;
  }
  .htmlHeightLarge {
    height: 300px;
  }
  `]
})
export class DropdownDemoComponent implements OnInit {
  // init data
  objectArray: Array<any>;
  stringArray: Array<any>;
  // bingValue
  selectedStringVaule: any;
  selectedMultiStringVaules: Array<any>;
  selectedObjectValue: any;
  selectedMultiObjectValues: Array<any>;
  // selectedValues: Array<any>;
  // selectValue: any;
  // selectStringValue:  any;
  // html
  stringArrayHtmlCode: string;
  stringArrayMultiHtmlCode: string;
  stringArrayTsCode: string;
  objectArraySingleHtmlCode: string;
  objectArrayMultiHtmlCode: string;
  objectArrayTscode: string;
  stringArrayDisableHtmlCode: string;

  constructor() {
    this.stringArrayHtmlCode =
        `<px-select [options]="stringArray" [(ngModel)]="selectStringValue" [placeholder]="'请选择'" [width]="400"></px-select>`;
    this.stringArrayMultiHtmlCode =
        `<px-select [options]="stringArray" [multiple]="true" [(ngModel)]="selectStringValue"></px-select>`;
    this.stringArrayTsCode = `stringArray = ['paletxUI', 'IaaS', 'paas'];`;
    this.objectArraySingleHtmlCode =
        `<px-select [options]="objectArray" [displayProperty]="'property2'" [bindProperty]="'property1'" [(ngModel)]="selectValue"></px-select>`;
    this.objectArrayMultiHtmlCode =
        `<px-select [options]="objectArray" [multiple]="true" [displayProperty]="'property2'" [bindProperty]="'property1'" [(ngModel)]="selectValue"></px-select>`;
    this.objectArrayTscode =
        `objectArray = [  {property1: '0', property2: '4Core4G'},
                          {property1: '1', property2: '4Core8G'},
                          {property1: '2', property2: '6Core6G'}, 
                          {
                            property1: '3',
                            property2: '8Core10GZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
                          },
                          {property1: '4', property2: '6Core8G'},
                          {property1: '5', property2: '8Core8G'},
                          {property1: '6', property2: '1Core1G'},
                          {property1: '7', property2: '2Core2G'},
                          {property1: '8', property2: '3Core3G'},
                          {property1: '9', property2: '4Core10G'}];`;
    this.stringArrayDisableHtmlCode =
        `<px-select [options]="objectArray" [displayProperty]="'property2'" [bindProperty]="'property1'" [placeholder]="'禁用'" [disabled]="true"></px-select>`;
  }

  ngOnInit() {
    this.objectArray = [
      {property1: '0', property2: '4Core4G'},
      {property1: '1', property2: '4Core8G'},
      {property1: '2', property2: '6Core6G'}, {
        property1: '3',
        property2:
            '8Core10GZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
      },
      {property1: '4', property2: '6Core8G'},
      {property1: '5', property2: '8Core8G'},
      {property1: '6', property2: '1Core1G'},
      {property1: '7', property2: '2Core2G'},
      {property1: '8', property2: '3Core3G'},
      {property1: '9', property2: '4Core10G'}
    ];
    this.stringArray = ['paletxUI', 'IaaS', 'paas'];

    // setTimeout(() => {
    //   this.stringArray.push('xxxxxxx');
    // }, 5000);
  }
}