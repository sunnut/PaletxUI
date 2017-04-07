import {AfterViewInit, Component} from '@angular/core';
import {LineCharts} from 'paletxUI/paletxUI';

@Component({
  moduleId: module.id,
  templateUrl: 'line-charts.html',
  styles: [`

            .ec{
                display: inline-block;
                width:  385px;
                height: 320px;
            }
         `]
})

export class PxLineChartsDemoComponent implements AfterViewInit {
  constructor(private lineCharts: LineCharts) {}

  ngAfterViewInit() {
    let lineChartsOption1 = {
      type: 'normal',
      title: {text: '折线图1', textAlgin: 'left', textColor: '#4E4E4E'},
      axisData: ['12:00', '13:00', '14:00', '15:00'],
      series: [
        {
          name: '数据项1',
          data: [15, 20, 43, 90],
          color: '#00ABFF',
        },
        {
          name: '数据项2',
          data: [45, 38, 55, 48],
          color: '#73CF22',
        }
      ],
      dataZoom: {show: false, showDetail: false},
      legend: {show: true, data: ['数据项1', '数据项2', '数据项3', '数据项4']}
    };

    let lineChartsOption2 = {
      type: 'normal',
      title: {text: '折线图2', textAlgin: 'left', textColor: '#4E4E4E'},
      axisData: ['12:00', '13:00', '14:00', '15:00'],
      series: [
        {
          name: '数据项1',
          data: [15, 20, 43, 90],
          color: '#00ABFF',
        },
        {
          name: '数据项2',
          data: [45, 38, 55, 48],
          color: '#73CF22',
        },
        {
          name: '数据项3',
          data: [20, 45, 30, 65],
          color: '#654982',
        },
        {
          name: '数据项4',
          data: [10, 20, 60, 90],
          color: '#F691B2',
        }
      ],
      dataZoom: {show: false, showDetail: false},
      legend: {show: true, data: ['数据项1', '数据项2', '数据项3', '数据项4']}
    };

    let lineChartsWithZoomOption1 = {
      type: 'normal',
      title:
          {text: '带缩略图的折线图1', textAlgin: 'left', textColor: '#4E4E4E'},
      axisData: ['12:00', '13:00', '14:00', '15:00'],
      series: [{
        name: '数据项1',
        data: [15, 20, 43, 90],
        color: '#00ABFF',
      }],
      dataZoom: {show: true, showDetail: false},
      legend:
          {show: false, data: ['数据项1', '数据项2', '数据项3', '数据项4']}
    };

    let lineChartsWithZoomOption2 = {
      type: 'normal',
      title:
          {text: '带缩略图的折线图2', textAlgin: 'left', textColor: '#4E4E4E'},
      axisData: ['12:00', '13:00', '14:00', '15:00'],
      series: [{
        name: '数据项1',
        data: [15, 20, 43, 90],
        color: '#00ABFF',
      }],
      dataZoom: {show: true, showDetail: true},
      legend:
          {show: false, data: ['数据项1', '数据项2', '数据项3', '数据项4']}
    };

    let miniLineChartsOption1 = {
      type: 'simple',
      title: {text: 'mini折线图1', textAlgin: 'left', textColor: '#4E4E4E'},
      series: [{
        name: '数据项1',
        data: [15, 20, 43, 90],
        color: '#00ABFF',
      }]
    };

    let miniLineChartsOption2 = {
      type: 'simple',  // reversal
      title: {text: 'mini折线图2', textAlgin: 'left', textColor: '#4E4E4E'},
      series: [{
        name: '数据项1',
        data: [15, 20, 43, 90],
        color: '#00ABFF',
      }],
      graphic: {text: '58%', font: 'bold 20px Microsoft YaHei'},
    };

    let echarts1 = document.getElementById('charts-container1');
    let echarts2 = document.getElementById('charts-container2');
    let echarts3 = document.getElementById('charts-container3');
    let echarts4 = document.getElementById('charts-container4');
    let echarts5 = document.getElementById('charts-container5');
    let echarts6 = document.getElementById('charts-container6');

    this.lineCharts.init(echarts1, lineChartsOption1);
    this.lineCharts.init(echarts2, lineChartsOption2);
    this.lineCharts.init(echarts3, lineChartsWithZoomOption1);
    this.lineCharts.init(echarts4, lineChartsWithZoomOption2);
    this.lineCharts.init(echarts5, miniLineChartsOption1);
    this.lineCharts.init(echarts6, miniLineChartsOption2);
  }
}