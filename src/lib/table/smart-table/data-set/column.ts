import {DataSet} from './data-set';
/**
 * Created by 10206545 on 2016/11/24.
 */
export class Column {
  public title: string = '';
  public type: string = '';
  public class: string = '';

  public component: any;
  public paras: string;


  public isSortable: boolean = false;
  public isEditable: boolean = true;
  public isFilterable: boolean = false;

  public sortDirection: string = '';
  public defaultSortDirection: string = '';

  protected compareFunction: Function;
  protected valuePrepareFunction: Function;
  protected filterFunction: Function;

  constructor(
      public id: string, protected settings: any, protected dataSet: DataSet) {
    this.process();
  }

  public getCompareFunction(): Function {
    return this.compareFunction;
  }

  public getValuePrepareFunction(): Function {
    return this.valuePrepareFunction;
  }

  public getFilterFunction(): Function {
    return this.filterFunction;
  }

  protected process(): void {
    this.title = this.settings['title'];
    this.class = this.settings['class'];
    this.type = this.prepareType();
    if (this.settings['component']) {
      this.component = this.settings['component'];
    }
    if (this.settings['paras']) {
      this.paras = this.settings['paras'];
    }

    this.isFilterable = typeof this.settings['filter'] === 'undefined' ?
        false :
        !!this.settings['filter'];
    this.defaultSortDirection =
        ['asc', 'desc'].indexOf(this.settings['sortDirection']) !== -1 ?
        this.settings['sortDirection'] :
        '';
    this.isSortable = typeof this.settings['sort'] === 'undefined' ?
        false :
        !!this.settings['sort'];
    this.isEditable = typeof this.settings['editable'] === 'undefined' ?
        false :
        !!this.settings['editable'];
    this.sortDirection = this.prepareSortDirection();

    this.compareFunction = this.settings['compareFunction'];
    this.valuePrepareFunction = this.settings['valuePrepareFunction'];
    this.filterFunction = this.settings['filterFunction'];
  }

  protected prepareType(): string {
    return this.settings['type'] || this.determineType();
  }

  protected prepareSortDirection(): string {
    return this.settings['sort'] === 'desc' ? 'desc' : 'asc';
  }

  protected determineType(): string {
    // TODO: determine type by data
    return 'string';
  }
}