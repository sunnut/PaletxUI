/**
 * Created by 6092002045 on 2017/3/28.
 */
import {Injectable} from '@angular/core';
import * as echarts from 'echarts';

import {ChartsInstance} from './charts-instance';
import {ChartsService} from './charts.services';

@Injectable()
export class BarCharts {
  private chartsService: ChartsService;

  public chartsInstance: ChartsInstance;

  constructor() {
    //
  }
  /**
   * 初始化柱状图配置的方法
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
    this.chartsService = new ChartsService();  //

    let mycharts = echarts.init(dom);  // 调用echarts Api初始化DOM

    let newOptions =
        this.chartsService.initBarChartOptions(option);  // 获取柱状图的配置。

    mycharts.setOption(newOptions);  // 调用echarts Api实例化图形。

    this.chartsInstance = new ChartsInstance();  // 封装后的返回实例

    this.chartsInstance.echartInstance = mycharts;  // set 方法设置 实例。

    return this.chartsInstance;
  }
}