/**
 * Created by 10206545 on 2016/12/7.
 */
import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

import {Row} from '../../data-set/row';
import {ViewContainerService} from '../../service/viewContainer.service';

@Component({
  selector: 'sif-detail-control',
  template: `
            <svg *ngIf="isClosed" (click)="check()"   x="0px" y="0px" class="ict-up"
                 width="14px" height="14px" viewBox="0 0 10 10" enable-background="new 0 0 10 10" xml:space="preserve">
            <polyline fill="none" stroke="#909090" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="1,9.413
                5.023,4.413 9,9.354 "/>
            </svg>

            <svg *ngIf="!isClosed" (click)="check()" x="0px" y="0px" class="ict-down"
                 width="14px" height="14px" viewBox="0 0 10 10" enable-background="new 0 0 10 10" xml:space="preserve">
            <polyline fill="none" stroke="#909090" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="9,4.353
                4.976,9.353 1,4.411 "/>
            </svg>

            <template #template >
                <tr class='innerTr'>
                    <td  [attr.colspan] ="columnNumber" >
                        <table class="innerTable">
                            <tbody>
                            <tr *ngFor="let e of keyArray;let i=index; let Odd=odd;let Even=even "
                                [ngClass]="{'odd':Odd,'even':Even}">
                                <td [ngClass]="'firstTd'">{{e}}</td>
                                <td [ngClass]="'SecondTd'">{{ dataArray[i] }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </template>
`,
  styles: [`

[class^="zte-table"], [class*="zte-table"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'ZteTableIcons' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.innerTr{
   border: 1px solid #ddd;
}
.innerTable{
    width:100%;
}
.innerTable tr{
    color:#333;font-size:12px;
}
.innerTable tr:nth-of-type(odd) {
    background: #f9f9f9;
}
.innerTable tr:nth-of-type(even) {
    background: #fff;
}
.innerTable tr td.firstTd{
    text-align:right;
    width:6%;
}
.innerTable tr td.SecondTd{
    padding-left:15px;
}
.ict-up,.ict-down{
    font-size:20px;
    line-height: 2.2 !important;
    cursor:pointer;
    margin-left:0;
}
.ict-up polyline,
.ict-down polyline{
  height:16px;
  width:16px;
  stroke: #00abff ;
}
.ict-up polyline:hover,
.ict-down polyline:hover{
 stroke: #2d91c4;
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailControlComponent implements OnInit {
  @ViewChild('template') mtp: any;
  @Input() columnNumber: number;
  @Input() trIndex: number;
  @Input() row: Row;

  private data: any;
  private keyArray: Array < any >= [];
  private dataArray: Array < any >= [];
  private trRef: ViewContainerRef;
  public isClosed: boolean = true;
  private tmp: any;
  public cssClass = 'ict-fold';
  public isFold: Boolean = true;

  constructor(
      public vc: ViewContainerRef, private vcService: ViewContainerService) {}

  ngOnInit() {
    this.data = this.row.getData();
    let columns: Array<any> = this.row.getColumns();
    let keySet: any = [];
    columns.forEach((column) => {
      keySet.push(column.id);
    });
    for (let elementKey in this.data) {
      if (!keySet.includes(elementKey)) {
        this.dataArray.push(this.data[elementKey]);
        this.keyArray.push(elementKey);
      }
    }
  }

  check() {
    if (this.isClosed) {
      this.trRef = this.vcService.getViewContainerList()[this.trIndex];
      if (this.trRef) {
        this.cssClass = 'ict-open';
        this.tmp = this.trRef.createEmbeddedView(this.mtp);
        this.isClosed = false;
      }

    } else {
      if (this.tmp) {
        this.tmp.destroy();
        this.isClosed = true;
        this.cssClass = 'ict-fold';
      }
    }
  }
}
