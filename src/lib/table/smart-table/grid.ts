import {EventEmitter} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';

import {Column} from './data-set/column';
import {DataSet} from './data-set/data-set';
import {Row} from './data-set/row';
import {DataSource} from './data-source/dataSource';
import {Deferred, getDeepFromObject} from './helpers';

/**
 * Created by 10206545 on 2016/11/28.
 */
export class Grid {
  createFormShown: boolean = false;

  protected source: DataSource;
  protected settings: any;
  protected dataSet: DataSet;

  protected onSelectRowSource = new Subject<any>();
  private tableChangeDetectRef: any;
  constructor(source: DataSource, settings: any, tableChangeDetectRef: any) {
    this.setSettings(settings);
    this.setSource(source);
    this.tableChangeDetectRef = tableChangeDetectRef;
  }

  showActionColumn(): boolean {
    return this.getSetting('actions.add') || this.getSetting('actions.edit') ||
        this.getSetting('actions.delete');
  }
  getNewRow(): Row {
    return this.dataSet.newRow;
  }
  getDataSet(): DataSet {
    return this.dataSet;
  }
  getColumns(): Array<Column> {
    return this.dataSet.getColumns();
  }

  getRows(): Array<Row> {
    return this.dataSet.getRows();
  }

  selectRow(row: Row): void {
    this.dataSet.selectRow(row);
  }
  onSelectRow(): Observable<any> {
    return this.onSelectRowSource.asObservable();
  }

  edit(row: Row): void {
    row.isInEditing = true;
  }
  setSource(source: DataSource): void {
    this.source = this.prepareSource(source);

    this.source.onChanged().subscribe(
        (changes) => this.processDataChange(changes));

    this.source.onUpdated().subscribe((data) => {
      let changedRow = this.dataSet.findRowByData(data);
      changedRow.setData(data);
    });
  }
  setSettings(settings: Object): void {
    this.settings = settings;
    this.dataSet = new DataSet([], this.settings.columns);

    if (this.source) {
      this.source.refresh();
    }
  }
  getSetting(name: string, defaultValue?: any): any {
    return getDeepFromObject(this.settings, name, defaultValue);
  }
  create(row: Row, confirmEmitter: EventEmitter<any>): void {
    let deferred = new Deferred();
    deferred.promise
        .then((newData) => {
          newData = newData ? newData : row.getNewData();
          this.source.prepend(newData).then(() => {
            this.createFormShown = false;
            this.dataSet.createNewRow();
          });
        })
        .catch(
            (err) => {
                // doing nothing
            });

    if (this.settings.add && this.settings.add.confirmCreate) {
      confirmEmitter.emit(
          {newData: row.getNewData(), source: this.source, confirm: deferred});
    } else {
      deferred.resolve();
    }
  }
  save(row: Row, confirmEmitter: EventEmitter<any>): void {
    let deferred = new Deferred();
    deferred.promise
        .then((newData) => {
          newData = newData ? newData : row.getNewData();
          this.source.update(row.getData(), newData).then(() => {
            row.isInEditing = false;
          });
        })
        .catch(
            (err) => {
                // doing nothing
            });

    if (this.getSetting('edit.confirmSave')) {
      confirmEmitter.emit({
        data: row.getData(),
        newData: row.getNewData(),
        source: this.source,
        confirm: deferred
      });
    } else {
      deferred.resolve();
    }
  }
  delete(row: Row, confirmEmitter: EventEmitter<any>): void {
    let deferred = new Deferred();
    deferred.promise
        .then(() => {
          this.source.remove(row.getData());
        })
        .catch(
            (err) => {
                // doing nothing
            });

    if (this.getSetting('delete.confirmDelete')) {
      confirmEmitter.emit(
          {data: row.getData(), source: this.source, confirm: deferred});
    } else {
      deferred.resolve();
    }
  }
  protected processDataChange(changes: any): void {
    if (this.shouldProcessChange(changes)) {
      this.dataSet.setData(changes['elements']);
      let row = this.determineRowToSelect(changes);
      if (row) {
        this.onSelectRowSource.next(row);
      }
      this.tableChangeDetectRef.markForCheck();
    }
  }

  protected shouldProcessChange(changes: any): boolean {
    // paging?? 不会触发数据的处理
    if ([
          'filter', 'sort', 'page', 'remove', 'refresh', 'load', 'paging'
        ].indexOf(changes['action']) !== -1) {
      return true;
    } else if (
        ['prepend', 'append'].indexOf(changes['action']) !== -1 &&
        !this.settings.pager.display) {
      return true;
    }

    return false;
  }

  // TODO: move to selectable? Separate directive
  protected determineRowToSelect(changes: any): Row {
    if (['load', 'page', 'filter', 'sort', 'refresh'].indexOf(
            changes['action']) !== -1) {
      return this.dataSet.select();
    }
    if (changes['action'] === 'remove') {
      if (changes['elements'].length === 0) {
        // we have to store which one to select as the data will be reloaded
        this.dataSet.willSelectLastRow();
      } else {
        return this.dataSet.selectPreviousRow();
      }
    }
    if (changes['action'] === 'append') {
      // we have to store which one to select as the data will be reloaded
      this.dataSet.willSelectLastRow();
    }
    if (changes['action'] === 'add') {
      return this.dataSet.selectFirstRow();
    }
    if (changes['action'] === 'update') {
      return this.dataSet.selectFirstRow();
    }
    if (changes['action'] === 'prepend') {
      // we have to store which one to select as the data will be reloaded
      this.dataSet.willSelectFirstRow();
    }
    return null;
  }
  protected prepareSource(source: any): DataSource {
    let initialSource: any = this.getInitialSort();
    if (initialSource && initialSource['field'] && initialSource['direction']) {
      source.setSort([initialSource], false);
    }
    if (this.settings.pager.display === true) {
      source.setPaging(1, this.settings.pager.perPage, false);
    }

    source.refresh();
    return source;
  }
  protected getInitialSort() {
    let sortConf: any = {};
    this.getColumns().forEach((column: Column) => {
      if (column.isSortable && column.defaultSortDirection) {
        sortConf['field'] = column.id;
        sortConf['direction'] = column.defaultSortDirection;
        sortConf['compare'] = column.getCompareFunction();
      }
    });
    return sortConf;
  }
}
