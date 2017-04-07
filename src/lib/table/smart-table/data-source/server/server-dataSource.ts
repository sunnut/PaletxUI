/**
 * Created by 10206545 on 2016/11/25.
 */
import {Http, RequestOptionsArgs, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';

import {getDeepFromObject} from '../../helpers';
import {LocalDataSource} from '../local/local-dataSource';

import {ServerSourceConf} from './server-source.conf';


export class ServerDataSource extends LocalDataSource {
  protected conf: ServerSourceConf;
  protected prepareDataOnLocal: boolean;
  protected lastRequestCount: number = 0;
  public countConf: any = {
      // lastRequestCount:Number=undefined
  };
  protected customGetdataFunction: (
      filterConf: Array<any>, sortConf: Array<any>, pagingConf: Object,
      countConf: Object) => {
    data: Array<any>, total: number
  } | Promise<any>;
  constructor(
      protected http: Http, conf: ServerSourceConf|{} = {},
      prepareDataOnLocal?: boolean,
      customGetdataFunction?:
          (filterConf: Array<any>, sortConf: Array<any>, pagingConf: Object,
           http: Http) => {data: Array<any>, total: number} |
          Promise<{data: Array<any>, total: number}>) {
    super();
    // let myAdd: (baseValue:number, increment:number) => number;
    this.conf = conf ? new ServerSourceConf(conf) : undefined;

    this.prepareDataOnLocal = prepareDataOnLocal ? prepareDataOnLocal : false;
    this.customGetdataFunction =
        customGetdataFunction ? customGetdataFunction : undefined;
    if ((typeof this.conf === 'undefined' || this.conf.endPoint === '') &&
        typeof this.customGetdataFunction === 'undefined') {
      throw new Error(
          'you should specify a endPoint or a customGetdataFunction');
    }
  }

  count(): number {
    return this.lastRequestCount;
  }

  getElements(): Promise<any> {
    //用户提供了获取数据的自定义回调函数，
    if (!!this.customGetdataFunction) {
      let result: any = this.customGetdataFunction(
          this.filterConf.filters, this.sortConf, this.pagingConf, this.http);
      if (result instanceof Promise) {
        const p = new Promise((resolve, reject) => {
          result.then((results: any) => {  //基于Promise的异步回调函数
            if (!(results.data instanceof Array)) {
              throw new Error(
                  'The data get from server should be an instance of Array');
            }
            this.lastRequestCount =
                results.total ? results.total : results.data.length;
            if (this.prepareDataOnLocal) {  //需要本地分���，排序，过滤等本地数据处理。
              results.data = super.prepareData(results.data);
              this.lastRequestCount =
                  super.count();  //本地分页处理后，如过滤，数据大小发生了变化。
              resolve(results.data.slice(0));
            } else {
              // return Promise.
              resolve(results.data.slice(0));
            }
          });
        });
        return p;
      } else {  //非异步回调函数
        if (!(result.data instanceof Array)) {
          throw new Error(
              'The data get from server should be an instance of Array');
        }
        this.lastRequestCount =
            result.total ? result.total : result.data.length;
        if (this.prepareDataOnLocal) {  //需要本地分页，排序，过滤等本地数据处理。
          result.data = super.prepareData(result.data);
          this.lastRequestCount = super.count();
          return Promise.resolve(result.data.slice(0));
        } else {
          return Promise.resolve(result.data.slice(0));
        }
      }

    } else {
      return this.requestElements()
          .map(res => {
            this.lastRequestCount = this.extractTotalFromResponse(res);
            this.data = this.extractDataFromResponse(res);
            return this.data;
          })
          .toPromise();
    }
  }

  /**
   * Extracts array of data from server response,and according to the value of
   * prepareDataOnLocal ,sort、filter and paginate the data or not.
   * @param res
   * @returns {any}
   */
  protected extractDataFromResponse(res: any): Array<any> {
    const rawData = res.json();
    let data = !!this.conf.dataKey ?
        getDeepFromObject(rawData, this.conf.dataKey, []) :
        rawData.data;

    if (data instanceof Array) {
      if (this.prepareDataOnLocal) {
        let ndata = super.prepareData(data);
        this.lastRequestCount = super.count();
        return ndata;

      } else {
        return data;
      }
    }

    throw new Error(
        `Data must be an array. Please check that data extracted from the server response by the key '${
                                                                                                        this.conf
                                                                                                            .dataKey
                                                                                                      }' exists and is array.`);
  }

  /**
   * Extracts total rows count from the server response
   * Looks for the count in the heders first, then in the response body
   * @param res
   * @returns {any}
   */
  protected extractTotalFromResponse(res: any): number {
    if (res.headers.has(this.conf.totalKey)) {
      return +res.headers.get(this.conf.totalKey);
    } else if (!!this.conf.totalKey) {
      const rawData = res.json();
      return getDeepFromObject(rawData, this.conf.totalKey, 0);
    } else {
      return res.json().data.length;
    }
  }

  protected requestElements(): Observable<any> {
    return this.http.get(this.conf.endPoint, this.createRequestOptions());
  }

  protected createRequestOptions(): RequestOptionsArgs {
    let requestOptions: RequestOptionsArgs = {};
    requestOptions.search = new URLSearchParams();

    requestOptions = this.addSortRequestOptions(requestOptions);
    requestOptions = this.addFilterRequestOptions(requestOptions);
    return this.addPagerRequestOptions(requestOptions);
  }

  protected addSortRequestOptions(requestOptions: RequestOptionsArgs):
      RequestOptionsArgs {
    let searchParams: URLSearchParams = <URLSearchParams>requestOptions.search;

    if (this.sortConf && this.conf.sortFieldKey && this.conf.sortDirKey) {
      this.sortConf.forEach((fieldConf) => {
        searchParams.set(this.conf.sortFieldKey, fieldConf.field);
        searchParams.set(
            this.conf.sortDirKey, fieldConf.direction.toUpperCase());
      });
    }

    return requestOptions;
  }

  protected addFilterRequestOptions(requestOptions: RequestOptionsArgs):
      RequestOptionsArgs {
    let searchParams: URLSearchParams = <URLSearchParams>requestOptions.search;

    if (this.filterConf.filters && this.conf.filterFieldKey) {
      this.filterConf.filters.forEach((fieldConf: any) => {
        if (fieldConf['search']) {
          searchParams.set(this.conf.filterFieldKey, fieldConf['search']);
        }
      });
    }

    return requestOptions;
  }

  protected addPagerRequestOptions(requestOptions: RequestOptionsArgs):
      RequestOptionsArgs {
    let searchParams: URLSearchParams = <URLSearchParams>requestOptions.search;

    if (this.pagingConf && this.pagingConf['page'] &&
        this.pagingConf['perPage'] && this.conf.pagerPageKey) {
      searchParams.set(this.conf.pagerPageKey, this.pagingConf['page']);
      searchParams.set(this.conf.pagerLimitKey, this.pagingConf['perPage']);
    }

    return requestOptions;
  }
}
