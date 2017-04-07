/**
 * Created by 10206545 on 2016/11/28.
 */
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';

import {Column} from '../../data-set/column';
import {DataSource} from '../../data-source/dataSource';

@Component({
  selector: 'sif-smart-table-title',
  styles: [`
        div span{
          content: '';
          display: block;
          cursor: pointer;
          width: 0;
          height: 0;
          border-bottom: 5px solid rgba(0, 0, 0, 0.3);
          border-top: 5px solid transparent;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          margin-bottom: 2px;
        }
        div span:last-child{
          transform: rotate(-180deg);
          margin-bottom: -2px;
        }
        div span.asc{
              border-bottom: 5px solid rgba(16, 142, 233, 1);
        }
        div span.desc{
              border-bottom: 5px solid rgba(16, 142, 233, 1);
        }
        .sortIcon{
          display:inline-block;
          vertical-align:bottom;
          margin-left:3px;
        }
`],
  template: `
    <span class="ng2-smart-title" [ngClass]="{sort:asc||desc}">{{ column.title }}</span>
    <div *ngIf="column.isSortable" class="sortIcon">
        <span  [ngClass]="{asc:asc}" (click)="sort('asc')"></span>
        <span  [ngClass]="{desc:desc}" (click)="sort('desc')"></span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {
  @Input() column: Column;
  @Input() source: DataSource;

  protected initDirection = '';
  public asc: boolean = false;
  public desc: boolean = false;
  constructor(private changeDetectionRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.initDirection = this.column.defaultSortDirection;
    if (this.initDirection === 'asc') {
      this.asc = true;
    }
    if (this.initDirection === 'desc') {
      this.desc = true;
    }
    this.source.onChanged().subscribe((elements) => {
      let sortConf = this.source.getSort();
      if (sortConf.length > 0 && sortConf[0]['field'] !== this.column.id &&
          this.column.isSortable) {
        this.desc = false;
        this.asc = false;
        this.changeDetectionRef.markForCheck();
      }
    });
  }

  sort(val: string): boolean {
    if (val === 'asc') {
      this.asc = true;
      this.desc = false;
    } else {
      this.asc = false;
      this.desc = true;
    }
    this.source.setSort([{
      field: this.column.id,
      direction: val,
      compare: this.column.getCompareFunction()
    }]);
    return false;
  }
}
