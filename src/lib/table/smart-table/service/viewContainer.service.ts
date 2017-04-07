import {Injectable} from '@angular/core';
/**
 * Created by 10206545 on 2017/3/13.
 */
@Injectable()
export class ViewContainerService {
  private viewContainerList: any;
  public getViewContainerList() {
    return this.viewContainerList;
  }
  public setViewContainersList(val: any) {
    this.viewContainerList = val;
  }
}