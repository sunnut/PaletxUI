/**
 * Created by 10206545 on 2016/11/24.
 */
import {Cell} from './cell';
import {Column} from './column';
import {DataSet} from './data-set';

export class Row {
  isSelected: boolean = false;
  isInEditing: boolean = false;
  protected cells: Array < Cell >= [];

  constructor(
      public index: number, protected data: any, protected _dataDet: DataSet) {
    this.process();
  }
  getCell(column: Column): Cell {
    return this.cells.find(el => el.getColumn() === column);
  }
  getCells() {
    return this.cells;
  }
  getData() {
    return this.data;
  }
  getColumns(): Array<any> {
    return this._dataDet.getColumns();
  }
  getNewData(): any {
    let values = Object.assign({}, this.data);
    this.getCells().forEach((cell) => {
      values[cell.getColumn().id] = cell.newValue;
    });
    return values;
  }
  setData(data: any): any {
    this.data = data;
    this.process();
  }
  protected process(): void {
    this.cells = [];
    this._dataDet.getColumns().forEach((column: Column) => {
      let cell = this.createCell(column);
      this.cells.push(cell);
    });
  }
  protected createCell(column: Column): Cell {
    let value =
        typeof this.data[column.id] == 'undefined' ? '' : this.data[column.id];
    return new Cell(value, this, column, this._dataDet);
  }
}
