/**
 * Created by 10206545 on 2016/11/28.
 */
import {Component, Input} from '@angular/core';

import {Column} from '../../data-set/column';
import {DataSource} from '../../data-source/dataSource';

@Component({
  selector: 'sif-smart-table-filter',
  styles: [`
  .ng2-smart-filter input{
    width: 100%;
    line-height: normal;
    padding: .375rem .75rem;
    padding-left:20px;
    font-weight: normal;
    border: 1px solid #ddd;
    height:26px;
    font-size:12px;
  }
  .ng2-smart-filter input:focus{
    outline:none;
    border:1px solid #5cb3fd ;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6) ;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6) ;

  }
.ng2-smart-filter{
   position:relative;
    margin:5px;
}
.ng2-smart-filter .filterIcon{
  position: absolute;
  top: 6px;
  left: 3px;
  fill: #dedede;
  width: 14px;
}
`],
  template: `
    <div class="ng2-smart-filter" *ngIf="column.isFilterable">
      <input
      [(ngModel)]="query"
      (keyup)="filter($event)"
      [ngClass]="inputClass"
      type="text"
      placeholder="{{ column.title }}" />
      <svg version="1.1" x="0px" y="0px"  width="16px" height="16px" class="filterIcon"
        viewBox="1 -1 16 16" style="enable-background:new 1 -1 16 16;" xml:space="preserve">
        <path d="M16-1H2l0,0.8c0,0.3,0.1,0.5,0.3,0.7l5.2,4.9v6.2l3,3.5V5.4l5.3-4.8C15.9,0.4,16,0.2,16,0L16-1z"/>
      </svg>
    </div>
  `
})
export class FilterComponent {
  @Input() column: Column;
  @Input() source: DataSource;
  @Input() inputClass: string = '';

  query: string = '';
  timeout: any;
  delay: number = 300;

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
    this.source.addFilter({
      field: this.column.id,
      search: this.query,
      filter: this.column.getFilterFunction()
    });
  }
}
