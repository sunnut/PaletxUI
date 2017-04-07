/**
 * Created by 10206545 on 2016/12/20.
 */
import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {Column} from '../../data-set/column';
import {DataSource} from '../../data-source/dataSource';

@Component({
  selector: 'sif-global-filter',
  styles: [`
         div.filter{
            display: inline;
            float: right;
          }
         .filter span.filterToggle{
              display:inline-block;
              width:28px;
              height:21px;
              border:1px solid #ddd;
              vertical-align:top;
              text-align: center;
              padding-top: 7px;
              margin-left:6px;
              cursor:pointer;
          }
         div.filter input {
            line-height: normal;
            padding: .375rem .75rem;
            font-weight: normal;
            border: 1px solid #ddd;
            margin-bottom: 10px;
            height:30px;
          }
        div.filter input:focus{
            outline:none;
            border:1px solid #5cb3fd ;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6) ;
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6) ;

          }
        .filter span.filterToggle svg path{
            fill:#ccc;
          }
           .filter span.filterToggle:hover svg path,
          .filter span.filterToggle.active:hover svg path{
           fill:#92c9ec;
          }
           .filter span.filterToggle.active svg path{
            fill:#2d91c4;
          }

    `],
  template: `
    <div class="filter">


    <input *ngIf="setting.showGlobalFilter"
      [(ngModel)]="query"
      (keyup)="filter($event)"
      type="text"
      class="globalfilter"
      placeholder="Enter a keyword for filtering"/>
     <span class="filterToggle" *ngIf="setting.showColumnFilterToggle" [ngClass]="{active: !setting.hideSubHeader}">
       <svg version="1.1" x="0px" y="0px"  width="16px" height="16px"
        (click)="clomnsFilterToggle()"
        viewBox="1 -1 16 16" style="enable-background:new 1 -1 16 16;" xml:space="preserve">
        <path d="M16-1H2l0,0.8c0,0.3,0.1,0.5,0.3,0.7l5.2,4.9v6.2l3,3.5V5.4l5.3-4.8C15.9,0.4,16,0.2,16,0L16-1z"/>
        </svg>
     </span>


    </div>

  `
})
export class GlobalFilterComponent implements OnInit, AfterViewInit {
  @Input() setting: any;
  @Input() columns: Array<Column>;
  @Input() source: DataSource;
  @Input() inputClass: string = '';
  query: string = '';
  timeout: any;
  delay: number = 300;
  filterArray: Array < {field: string, search: string, filter: Function} >= [];
  ngOnInit() {
    if (!!this.columns) {
      this.columns.forEach((column, index) => {
        let filterConf: any = {field: '', search: '', filter: undefined};
        filterConf.field = column.id;
        filterConf.filter = column.getFilterFunction();
        this.filterArray.push(filterConf);
      });
    }
  }
  ngAfterViewInit(): void {
    this.source.onChanged().subscribe((elements) => {
      let filterConf = this.source.getFilter();
      if (filterConf && filterConf.filters && filterConf.filters.length === 0) {
        this.query = '';
      }
    });
  }

  filter(event: any): boolean {
    if (event.which === 13) {  // Enter
      this.addFilter();
      // ignore tab component
    } else if (event.which !== 9) {  // Table
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.addFilter();
      }, this.delay);
    }
    return false;
  }

  protected addFilter(): void {
    if (!!this.filterArray) {
      this.filterArray.forEach((filterConf, index) => {
        filterConf.search = this.query;
      });
      this.source.setFilter(this.filterArray, false);
    }
  }
  public clomnsFilterToggle() {
    this.setting.hideSubHeader = !this.setting.hideSubHeader;
  }
  /*this.source.addFilter({
   field: this.column.id,
   search: this.query,
   filter: this.column.getFilterFunction()
   });*/
}
