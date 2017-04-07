import {Injectable} from '@angular/core';
import * as echarts from 'echarts';

import {ChartsInstance} from './charts-instance';
import {ChartsService} from './charts.services';

@Injectable()
export class LineCharts {
  private chartsInstance: ChartsInstance;

  private chartsService: ChartsService;

  /**
   * 初始化折线配置的方法
   *
   * ### Parmas：
   *    dom,html 的dom对象，用来装载图形。
   *    option,配置。
   * ### Example
   *    constructor(private lineCharts:LineCharts){}
   *
   *    ...
   *    ......
   *    ngAfterViewInit() {
   *          let htmlElementDom = document.getElementByxx('xx');
   *          let options = {
   *            ....
   *            ..
   *          }
   *          this.lineCharts.init(htmlElementDom,options);
   *    }
   *
   * ### Return {ChartsInstance}
   */
  public init(dom: any, option: any): ChartsInstance {
    this.chartsService = new ChartsService();

    let mycharts = echarts.init(dom);  // 调用echarts Api初始化DOM

    let newOptions =
        this.chartsService.initLineChartOptions(option);  // 获取折线图配置。

    mycharts.setOption(newOptions);  // 调用echarts Api实例化图形

    this.chartsInstance = new ChartsInstance();

    this.chartsInstance.echartInstance = mycharts;

    return this.chartsInstance;
  }
}