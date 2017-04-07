/**
 * Created by 10206545 on 2016/11/24.
 */
import {Column} from './column';
import {DataSet} from './data-set';
import {Row} from './row';

export class Cell {
  newValue = '';
  protected static PREPARE = (value: any) => value;
  constructor(
      protected value: any, protected row: Row, protected column: Column,
      protected dataSet: DataSet) {
    this.newValue = value;
  }
  getValue(): any {
    let valid = this.column.getValuePrepareFunction() instanceof Function;
    let prepare: Function =
        valid ? this.column.getValuePrepareFunction() : Cell.PREPARE;
    return prepare.call(null, this.value);
  }
  getColumn(): Column {
    return this.column;
  }
  getRow(): Row {
    return this.row;
  }
  getColumnClass() {
    return this.column.class;
  }
}
