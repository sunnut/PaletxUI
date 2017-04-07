export class ChartsService {
  /*
   *
   *   补全 echarts 缺省配置。
   *
   * */


  // tooltip 默认配置
  private tooltip: any = {
    trigger: 'axis',
    axisPointer: {
      animation: false,
    }
  };

  //  xAxis轴默认配置
  private xAxis: any = {
    type: 'category',
    splitLine: {show: false},
    axisTick: {show: false},
    axisLabel: {textStyle: {color: '#B6BBBF'}},
    axisLine: {show: false, lineStyle: {color: '#B6BBBF'}},
  };

  // x 轴隐藏的配置
  private xAxisMini: any = {
    type: 'category',
    splitLine: {show: false},
    data: ['12:00', '13:00', '14:00', '15:00'],
    axisTick: {show: false},
    axisLabel: {show: false, textStyle: {color: '#B6BBBF'}},
    axisLine: {show: false, lineStyle: {color: '#B6BBBF'}},
  };

  // grid 网格配置
  private grid: any = {left: '3%', bottom: '18%', containLabel: true};

  // Y 轴的配置
  private yAxis: any = {
    type: 'value',
    min: 0,
    max: 100,
    axisLine: {show: false},
    axisTick: {show: false},
    axisLabel: {formatter: '{value}% ', textStyle: {color: '#B6BBBF'}},
  };

  // Y轴隐藏的配置
  private yAxisMini: any = {
    splitLine: {show: false},
    type: 'value',
    min: 0,
    max: 100,
    axisLine: {show: false},
    axisTick: {show: false},
    axisLabel:
        {show: false, formatter: '{value}% ', textStyle: {color: '#B6BBBF'}},

  };

  // 区域缩放配置
  private dataZoom: any = {
    type: 'slider',
    show: true,
    xAxisIndex: [0],
    start: 1,
    end: 35,
    handleIcon:
        'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.' +
        '9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    handleSize: '80%',
    handleStyle: {
      color: '#fff',
      shadowBlur: 3,
      shadowColor: 'rgba(0, 0, 0, 0.6)',
      shadowOffsetX: 2,
      shadowOffsetY: 2
    }
  };

  // 图形元素-文本配置区域
  private graphic: any = [{
    type: 'text',
    left: 'center',
    top: '40%',
    style: {fill: '#000', text: '', font: ''}
  }];

  // 系列列表.每个项决定自己的图标类型。
  private series: any = [];

  // 图例的配置
  private legend: any = {bottom: 'bottom', data: []};

  /**
   * 初始化折线图配置的方法
   *
   * ### Example
   *     chartsService:ChartsService = new ChartsService();
   *
   *     let optionsNew  = chartsService.initLineChartOptions(optionsOld:any);
   *
   * @return
   */
  public initLineChartOptions(option: any): Object {
    let optionNew: any = {};

    optionNew.title = option.title;

    optionNew.tooltip = this.tooltip;

    optionNew.grid = this.grid;

    // 判断是 nomarl 类型还是 simple 类型的折线图。
    if (option.type === 'normal') {  // 常规折线图时

      this.xAxis.data = option.axisData;  // 获取x轴的数据

      optionNew.xAxis = this.xAxis;

      optionNew.yAxis = this.yAxis;  // 设置y轴

      if (option.dataZoom.show) {  // 配置缩放区域

        optionNew.dataZoom = this.dataZoom;

        optionNew.dataZoom.showDetail = option.dataZoom.showDetail;
      }

      if (option.legend.show) {  // 如果图例打开 配置图例

        option.legend.data.forEach((item: any, index: any, array: any) => {
          let data: any = {};
          data.name = item;
          data.icon = 'circle';
          this.legend.data.push(data);
        });
        optionNew.legend = this.legend;
      }

    } else if (option.type === 'simple') {  // 是简单类型的折线图时

      optionNew.xAxis = this.xAxisMini;

      optionNew.yAxis = this.yAxisMini;

      if (option.graphic) {
        // graphic 值为数组,此时固定为只有一个 graphic实例,即文字。
        optionNew.graphic = this.graphic;
        optionNew.graphic[0].style.text = option.graphic.text;
        optionNew.graphic[0].style.font = option.graphic.font;
      }
    }

    // 配置series系列数据。
    let seriesNew: any = this.series.concat();  // service可能单例,深度拷贝。

    // 迭代补全数据
    option.series.forEach((item: any, index: any, array: any) => {
      let serieItemNew: any = {
        //  默认类型为折线,标记类图形,为circle。
        type: 'line',
        symbol: 'circle',
      };

      serieItemNew.name = item.name;  // 指定名称

      serieItemNew.data = item.data;  // 指定数据

      let lineStyleNew: any = {
        // 线的配置
        normal: {color: item.color}
      };

      let itemStyleNew: any = {
        // 折线拐点标志的样式
        normal: {
          color: item.color,
        },
        emphasis: {
          color: item.color,
          shadowColor: item.color,  // 阴影颜色
          shadowBlur: 25            // 阴影大小
        }
      };

      serieItemNew.lineStyle = lineStyleNew;

      serieItemNew.itemStyle = itemStyleNew;

      seriesNew.push(serieItemNew);
    });

    optionNew.series = seriesNew;  // 设置 series

    return optionNew;
  }

  /**
     * 初始化柱状图配置的方法
     *
     * ### Example
     *     chartsService:ChartsService = new ChartsService();
     *
     *     let optionsNew  = chartsService.initBarChartOptions(optionsOld:any);
     *
     * @return {Object}
     */
  public initBarChartOptions(option: any): Object {
    let optionNew: any = {};

    optionNew.title = option.title;  // 主标题

    optionNew.tooltip = {
      // tooltip配置
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',  // 默认为直线，可选为：'line' | 'shadow'
        shadowStyle: {color: '#c2c6c9', opacity: '0.3'}
      }
    };

    optionNew.grid = this.grid;  // 指定网格配置


    if (option.type === 'normal') {  // 如果是普通类型柱状图

      optionNew.xAxis = this.xAxis;

      optionNew.yAxis = this.yAxis;

      optionNew.xAxis.data = option.axisData;  // 类目轴类目数据


    } else if (option.type === 'reversal') {  // 如果是以Y轴为类目轴的情况

      optionNew.xAxis = this.xAxis;

      optionNew.yAxis = this.yAxis;

      // x y 轴类型反转
      optionNew.xAxis.type = 'value';

      optionNew.xAxis.data = [0, 20, 40, 60, 80, 100];  // 数值轴，数据

      optionNew.xAxis.axisLabel.formatter = '{value}%';  // 数值轴，数据格式

      optionNew.yAxis.type = 'category';  // 设置为类目轴

      optionNew.yAxis.data = option.axisData;  // 类目轴 数据

      optionNew.yAxis.min = null;  // 取消 min

      optionNew.yAxis.max = null;  // 取消 max

      optionNew.yAxis.axisLabel.formatter = null;  // 取消默认类目轴Y的formatter
    }
    if (option.legend.show) {  // 如果图例开关打开

      option.legend.data.forEach((item: any, index: any, array: any) => {
        let data: any = {};
        data.name = item;
        data.icon = 'circle';
        this.legend.data.push(data);
      });
      optionNew.legend = this.legend;
    }


    let seriesNew: any = this.series.concat();  // 深度拷贝

    // 设置系列series 数据
    option.series.forEach((item: any, index: any, array: any) => {

      let serieItemNew: any = {
        type: 'bar',       // 默认类型为柱状,
        symbol: 'circle',  // 标记图形
        barWidth: 15,      // 柱条宽度
      };

      serieItemNew.name = item.name;  // 名称

      serieItemNew.data = item.data;  // 数据

      let itemStyleNew: any = {
        // 柱条图形样式
        normal: {color: item.color}
      };

      serieItemNew.itemStyle = itemStyleNew;

      seriesNew.push(serieItemNew);
    });

    optionNew.series = seriesNew;  // 设置 series

    return optionNew;
  }
}