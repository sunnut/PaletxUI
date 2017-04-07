/**
 * Created by 10206545 on 2017/3/14.
 */
import {Injectable} from '@angular/core';
@Injectable()
export class LanService {
  private lan: any;
  private lanZh = {
    view: '每页显示',
    records: '条 ',
    recordsWithoutComma: '条',
    totalview: '共 ',
    page: '第',
    totalPage: '页',
    number: '序号',
    detail: '详情'
  };
  private lanEn = {
    view: 'View',
    records: 'records',
    recordsWithoutComma: 'records',
    totalview: 'Total ',
    page: 'Page',
    totalPage: 'Pages',
    number: 'No.',
    detail: 'Details'
  };
  public setlanguage(lan: string) {
    if (lan === 'en') {
      this.lan = this.lanEn;
    } else {
      this.lan = this.lanZh;
    }
  }
  public getlanguage(key: string): any {
    if (this.lan[key]) {
      return this.lan[key];
    } else {
      return key;
    }
  }
}
