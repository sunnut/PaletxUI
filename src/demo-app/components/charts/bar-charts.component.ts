import {AfterViewInit, Component} from '@angular/core';
import {BarCharts} from 'paletxUI/paletxUI';

@Component({
  moduleId: module.id,
  templateUrl: 'bar-charts.html',
  styles: [`

            .ec{
                display: inline-block;
                width:  385px;
                height: 320px;
            }
         `]
})

export class PxBarChartsDemoComponent implements AfterViewInit {
  constructor(private barCharts: BarCharts) {}

  ngAfterViewInit() {
    let barCharts1 = {
      type: 'normal',
      axisData: ['项一', '项二', '项三', '项四', '项五', '项六', '项七'],
      title: {text: '柱状图标题1', textAlgin: 'left', textColor: '#4E4E4E'},
      series: [{
        name: '对象A',
        data: [30, 30, 70, 70, 90, 90, 50],
        color: '#3398DB',
        opacity: 0.75
      }],
      legend:
          {show: false, data: ['数据项1', '数据项2', '数据项3', '数据项4']}
    };

    let barCharts2 = {
      type: 'normal',
      axisData: ['项一', '项二', '项三', '项四', '项五', '项六', '项七'],
      title: {text: '柱状图标题2', textAlgin: 'left', textColor: '#4E4E4E'},
      series: [
        {
          name: '对象A',
          data: [30, 30, 70, 70, 90, 90, 50],
          color: '#3398DB',
          opacity: 0.75
        },
        {
          name: '对象B',
          data: [30, 30, 70, 70, 90, 90, 50],
          color: '#96DB59',
          opacity: 0.75
        }
      ],
      legend: {show: true, data: ['对象A', '对象B', '数据项3', '数据项4']}
    };

    let barCharts3 = {
      type: 'reversal',
      axisData: ['1', '2', '3', '4', '5', '6', '7'],
      title: {text: '柱状图标题2', textAlgin: 'left', textColor: '#4E4E4E'},
      series: [{
        name: '对象B',
        data: [30, 30, 70, 70, 90, 90, 50],
        color: '#96DB59',
        opacity: 0.75
      }],
      legend: {show: false, data: ['对象A', '对象B', '数据项3', '数据项4']}
    };

    let echarts1 = document.getElementById('charts-container1');
    let echarts2 = document.getElementById('charts-container2');
    let echarts3 = document.getElementById('charts-container3');

    this.barCharts.init(echarts1, barCharts1);
    this.barCharts.init(echarts2, barCharts2);
    this.barCharts.init(echarts3, barCharts3);
  }
}