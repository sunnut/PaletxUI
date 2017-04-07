export class ChartsInstance {
  private _echartInstance: any;  // echrts 实例，外部可通过get获取后调用原生API

  set echartInstance(echartInstance: any) {
    this._echartInstance = echartInstance;
  }

  get echartInstance(): any {
    return this._echartInstance;
  }

  /**
   * 销毁实例，销毁后实例无法再被使用。
   *
   * ### Parmas：
   *
   * ### Example
   *  chartsInstance: ChartsInstance;
   *   ...
   *   ..
   *   chartsInstance.dispose();
   *
   * ### Return
   */
  public dispose(): void {
    this.echartInstance.dispose();
  }
  /**
   * 清空当前实例，会移除实例中所有的组件和图表
   *
   * ### Parmas：
   *
   * ### Example
   *  chartsInstance: ChartsInstance;
   *   ...
   *   ..
   *   chartsInstance.clear();
   *
   * ### Return
   */
  public clear(): void {
    this.echartInstance.clear();
  }

  /**
   * 改变图表尺寸，在容器大小发生改变时需要手动调用。
   *
   * ### Parmas：
   *
   * ### Example
   *  chartsInstance: ChartsInstance;
   *   ...
   *   ..
   *   chartsInstance.clear();
   *
   * ### Return
   */
  public resize(opts?: {
    width?: number | string,
    height?: number|string,
    silent?: boolean
  }): void {
    this.echartInstance.resize(opts);
  }
  /**
   * 获取 ECharts 实例容器的宽度。
   *
   * ### Parmas：
   *
   * ### Example
   *  chartsInstance: ChartsInstance;
   *   ...
   *   ..
   *   chartsInstance.getWidth();
   *
   * ### Return
   */
  public getWidth(): number {
    return this.echartInstance.getWidth();
  }
  /**
   * 获取 ECharts 实例容器的高度。
   *
   * ### Parmas：
   *
   * ### Example
   *  chartsInstance: ChartsInstance;
   *   ...
   *   ..
   *   chartsInstance.getHeight();
   *
   * ### Return
   */
  public getHeight(): number {
    return this.echartInstance.getHeight();
  }
}
