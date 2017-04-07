/**
 * Created by 10206545 on 2016/11/28.
 */
export class ServerSourceConf {
  endPoint: string;

  sortFieldKey: string;
  sortDirKey: string;
  pagerPageKey: string;
  pagerLimitKey: string;
  filterFieldKey: string;
  totalKey: string;
  dataKey: string;

  constructor({
    endPoint = '',
    sortFieldKey = '',
    sortDirKey = '',
    pagerPageKey = '',
    pagerLimitKey = '',
    filterFieldKey = '',
    totalKey = '',
    dataKey = ''
  } = {}) {
    this.endPoint = endPoint ? endPoint : '';

    this.sortFieldKey = sortFieldKey ? sortFieldKey : '';
    this.sortDirKey = sortDirKey ? sortDirKey : '';
    this.pagerPageKey = pagerPageKey ? pagerPageKey : '';
    this.pagerLimitKey = pagerLimitKey ? pagerLimitKey : '';
    this.filterFieldKey = filterFieldKey ? filterFieldKey : '';
    this.totalKey = totalKey ? totalKey : '';
    this.dataKey = dataKey ? dataKey : '';
  }
}