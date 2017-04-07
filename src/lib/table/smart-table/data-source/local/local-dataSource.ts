import {deepExtend} from '../../helpers';
import {DataSource} from '../dataSource';

import {LocalFilter} from './local-filter';
import {LocalPager} from './local-pager';
import {LocalSorter} from './local-sorter';

/**
 * Created by 10206545 on 2016/11/25.
 */
export class LocalDataSource extends DataSource {
  protected data: Array < any >= [];
  protected filteredAndSorted: Array < any >= [];
  protected sortConf: Array < any >= [];
  protected settings: any;
  protected filterConf: any = {filters: [], andOperator: true};
  protected pagingConf: any = {};
  constructor(setting?: any) {
    super();
    this.settings = setting;
    if (setting) {
      this.data = setting.localData;
    }
  }
  reset(silent = false): void {
    if (silent) {
      this.filterConf = {filters: [], andOperator: true};
      this.sortConf = [];
      this.pagingConf['page'] = 1;

    } else {
      this.setFilter([], true, false);
      this.setSort([], false);
      this.setPage(1);
    }
  }
  load(data: Array<any>): Promise<any> {
    this.data = data;
    return super.load(data);
  }
  prepend(element: any): Promise<any> {
    this.reset(true);
    this.data.unshift(element);
    return super.prepend(element);
  }
  append(element: any): Promise<any> {
    this.reset(true);
    this.data.push(element);
    return super.append(element);
  }
  add(element: any): Promise<any> {
    this.data.push(element);
    return super.add(element);
  }
  remove(element: any): Promise<any> {
    this.data = this.data.filter(el => el !== element);
    return super.remove(element);
  }
  update(element: any, values: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.find(element)
          .then((found) => {
            found = deepExtend(found, values);
            super.update(found, values).then(resolve).catch(reject);
          })
          .catch(reject);
    });
  }
  find(element: any): Promise<any> {
    let found = this.data.find(el => el === element);
    if (found) {
      return Promise.resolve(found);
    }

    return Promise.reject(new Error('Element was not found in the dataset'));
  }
  getElements(): Promise<any> {
    this.data = this.settings.localData;
    let data = this.data.slice(0);
    return Promise.resolve(this.prepareData(data));
  }

  getAll(): Promise<any> {
    let data = this.data.slice(0);
    return Promise.resolve(data);
  }
  empty(): Promise<any> {
    this.data = [];

    return super.empty();
  }

  count(): number {
    return this.filteredAndSorted.length;
  }

  /**
   *
   * Array of conf objects
   * [
   *  {field: string, direction: asc|desc|null, compare: Function|null},
   * ]
   * @param conf
   * @param doEmit
   * @returns {LocalDataSource}
   */
  setSort(conf: Array<any>, doEmit = true): LocalDataSource {
    if (conf !== null) {
      conf.forEach((fieldConf: any) => {
        if (!fieldConf['field'] ||
            typeof fieldConf['direction'] === 'undefined') {
          throw new Error('Sort configuration object is not valid');
        }
      });
      this.sortConf = conf;
    }

    super.setSort(conf, doEmit);
    return this;
  }

  /**
   *
   * Array of conf objects
   * [
   *  {field: string, search: string, filter: Function|null},
   * ]
   * @param conf
   * conf: Array - array of filter setting objects, object format is:
          field - string - columnKey
          search - string - search query
          filter - Function|null - custom filter function
   * @param andOperator  boolean - how to process multiple filters (as AND or as
   OR), default = true (AND) * @param doEmit  boolean - emit event (to refresh
   the table) or not, default = true
   * @returns {LocalDataSource}
   */
  setFilter(conf: Array<any>, andOperator = true, doEmit = true):
      LocalDataSource {
    if (conf && conf.length > 0) {
      conf.forEach((fieldConf: any) => {
        this.addFilter(fieldConf, andOperator, false);
      });
    } else {
      this.filterConf = {filters: [], andOperator: true};
    }
    this.filterConf.andOperator = andOperator;
    this.pagingConf['page'] = 1;

    super.setFilter(conf, andOperator, doEmit);
    return this;
  }
  /*
  * fieldConf: Object - one filter object, format is:
               field - string - columnKey
               search - string - search query
               filter - Function|null - custom filter function
   * andOperator: boolean - how to process multiple filters (as AND or as OR),
  default = true (AND) * doEmit: boolean - emit event (to refresh the table) or
  not, default = true
   */

  addFilter(fieldConf: any, andOperator = true, doEmit: boolean = true):
      LocalDataSource {
    if (!fieldConf['field'] || typeof fieldConf['search'] === 'undefined') {
      throw new Error('Filter configuration object is not valid');
    }

    let found: boolean = false;
    this.filterConf.filters.forEach((currentFieldConf: any, index: any) => {
      if (currentFieldConf['field'] === fieldConf['field']) {
        this.filterConf.filters[index] = fieldConf;
        found = true;
      }
    });
    if (!found) {
      this.filterConf.filters.push(fieldConf);
    }
    this.filterConf.andOperator = andOperator;
    super.addFilter(fieldConf, andOperator, doEmit);
    return this;
  }

  setPaging(page: number, perPage: number, doEmit: boolean = true):
      LocalDataSource {
    this.pagingConf['page'] = page;
    this.pagingConf['perPage'] = perPage;

    super.setPaging(page, perPage, doEmit);
    return this;
  }

  setPage(page: number, doEmit: boolean = true): LocalDataSource {
    this.pagingConf['page'] = page;
    super.setPage(page, doEmit);
    return this;
  }

  getSort(): any {
    return this.sortConf;
  }

  getFilter(): any {
    return this.filterConf;
  }

  getPaging(): any {
    return this.pagingConf;
  }

  protected prepareData(data: Array<any>): Array<any> {
    data = this.filter(data);
    data = this.sort(data);
    this.filteredAndSorted = data.slice(0);

    return this.paginate(data);
  }

  protected sort(data: Array<any>): Array<any> {
    if (this.sortConf) {
      this.sortConf.forEach((fieldConf) => {
        data = LocalSorter.sort(
            data, fieldConf['field'], fieldConf['direction'],
            fieldConf['compare']);
      });
    }
    return data;
  }

  // TODO: refactor?
  protected filter(data: Array<any>): Array<any> {
    if (this.filterConf.filters) {
      if (this.filterConf.andOperator) {
        this.filterConf.filters.forEach((fieldConf: any) => {
          data = LocalFilter.filter(
              data, fieldConf['field'], fieldConf['search'],
              fieldConf['filter']);
        });
      } else {
        let mergedData: Array<any> = [];
        this.filterConf.filters.forEach((fieldConf: any) => {
          mergedData = mergedData.concat(LocalFilter.filter(
              data, fieldConf['field'], fieldConf['search'],
              fieldConf['filter']));
        });
        // remove non unique items
        data = mergedData.filter((elem, pos, arr) => {
          return arr.indexOf(elem) === pos;
        });
      }
    }
    return data;
  }

  protected paginate(data: Array<any>): Array<any> {
    if (this.pagingConf && this.pagingConf['page'] &&
        this.pagingConf['perPage']) {
      data = LocalPager.paginate(
          data, this.pagingConf['page'], this.pagingConf['perPage']);
    }
    return data;
  }
}
