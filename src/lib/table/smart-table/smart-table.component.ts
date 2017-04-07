/**
 * Created by 10206545 on 2016/11/28.
 */
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChildren, ViewContainerRef} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {DataSource} from './data-source/dataSource';
import {LocalDataSource} from './data-source/local/local-dataSource';
import {ServerDataSource} from './data-source/server/server-dataSource';
import {Grid} from './grid';
import {LanService} from './service/language.service';
import {ViewContainerService} from './service/viewContainer.service';

@Component({
  selector: 'sif-smart-table',
  templateUrl: 'smart-table.html',
  styles: [`/*table*/
.ng2-smart-table {
  font-family: "Microsoft yahei", Segoe UI, Arial ;
  font-size:12px;
  line-height: 1.5;
  color:#333;
  border-collapse: collapse;
  display: table;
  width: 100%;
  max-width: 100%;
  overflow: auto;
  word-break: keep-all;
}
.ng2-smart-table tr,
.ng2-smart-table td{
   border: 1px solid #ddd;
   vertical-align:middle;
}
.ng2-smart-table th,
.ng2-smart-table td{
  height:41px;
}
.ng2-smart-table td.operation{
  text-align:center;
}
.ng2-smart-th.operation{
  text-align:center;
}
.ng2-smart-table th.number{
  text-align:right;
}
.ng2-smart-table td.number{
  text-align:right;
  padding-right:25px;
}
.ng2-smart-table .ng2-smart-row .selected {
  background: rgba(0, 0, 0, 0.05);
}
/*modify*/
.ng2-smart-th{
    font-family: "Microsoft yahei", Segoe UI, Arial;
    color:#8b8b8b;
    text-decoration:none;
    font-weight: normal;
    font-size:12px;
    border: 1px solid #ddd;
    text-align:left;
    padding:2px 10px 0px 10px;
}
.ng2-smart-filters th.ng2-smart-th {
  padding-bottom: 1px ;
}
.ng2-smart-row td{
  height:41px;
  border: 1px solid #ddd;
  padding:3px 10px;
}

.ng2-smart-table tr:nth-of-type(odd) {
  background: #f9f9f9;
}
.ng2-smart-table tr:nth-of-type(even) {
  background: #fff;
}
.ng2-smart-table thead tr{
  background-color: #fff;

}
.ng2-smart-table tr td.ckbox,
.ng2-smart-table tr th.ckbox{
  text-align:center;
  width:10px ;
}
.ng2-smart-table td.ckbox{
  padding-left:0px ;
  padding-right:0px ;

}
.ng2-smart-table  input[type="checkbox"],
.ng2-smart-table tr td.ckbox label,
.ng2-smart-table tr th.ckbox label{
  margin-bottom:0;
}
.ng2-smart-table  input[type="checkbox"]{
  margin-right:0;
}
.ng2-smart-table .ng2-smart-th.index,
.ng2-smart-table td.index,
.ng2-smart-table .ng2-smart-th.detail,
.ng2-smart-table td.detail{
  text-align:center;
  width:51px;
}
.ng2-smart-table.light td,
.ng2-smart-table.light th,
.ng2-smart-table.light .ng2-smart-row  td{
  height:51px;
  border-left:0 !important;
  border-right:0 !important;
}
.ng2-smart-table.light tr.ng2-smart-filters th.ng2-smart-th{
  padding-bottom: 10px !important;
}
.ng2-smart-table.light .ng2-smart-filter input{
  height:30px;
}
.ng2-smart-table tr td.nodata{
  text-align:center;
}

/*card*/
.ng2-smart-table.card td,
.ng2-smart-table.card tr{
    border:0;
}
.ng2-smart-table.card tr td{
    padding-bottom:20px;
    padding-top:20px;
    vertical-align:middle;
}
.ng2-smart-table.card tr td:first-child{
    width:8px;
}
.ng2-smart-table.card tr td .title{
    font-size:16px;
    font-weight:bold;
}

.ng2-smart-table.card td img{
    width:60px;
    height:60px;
}
.ng2-smart-table.card th.ng2-smart-th {
    border:0;
    background-color:#fff;
}
.ng2-smart-table.card .ng2-smart-th.img{
    width:120px;
}
.ng2-smart-table.card thead tr th{
    padding-bottom:20px;
    padding-top:20px;
}`],
  providers: [ViewContainerService, LanService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SmartTableComponent implements OnChanges, AfterViewInit {
  @ViewChildren('ref', {read: ViewContainerRef}) trRef: any;
  @ViewChildren('bdref', {read: ViewContainerRef}) bdRef: any;
  @Input() settings: any = {};
  @Input() refreshEmitter: Observable<any>;
  @Output()
  public slectedDataChange: EventEmitter<any> = new EventEmitter<any>();

  number: string;
  details: string;
  public source: DataSource;
  public columns: number = 0;
  public grid: Grid;
  public type: string;
  public isChecked = false;
  public childrenCheckStatus = {status: false};
  private selectedData: Array < any >= [];
  public allCheckStatus: boolean = false;
  constructor(
      private http: Http, private vcService: ViewContainerService,
      private lanServce: LanService, private cdRef: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.trRef.changes.subscribe((item: any) => {
      this.vcService.setViewContainersList(item._results);

    });
  }
  allCheckStatusChange(val: any) {
    this.childrenCheckStatus = {
      status: val
    };  //通过新建一个Object 让检测进入到每个checkbox
        //子组件，另外一个解决办法是建立一个数组，每个数组存储对应的值
    this.isChecked = val;
    this.allCheckStatus = val;
    if (this.isChecked) {
      this.selectedData =
          this.grid.getDataSet()
              .getData()
              .slice();  //对dataset里面的数组进行浅拷贝，避免后面的删除影响到原数据
      this.slectedDataChange.emit(this.selectedData);
    } else {
      this.selectedData = [];
      this.slectedDataChange.emit(this.selectedData);
    }
  }


  changeSlectedData(val: any) {
    if (val.status) {
      this.selectedData.push(val.data);
      this.slectedDataChange.emit(this.selectedData);
      if (this.selectedData.length == this.grid.getRows().length &&
          !this.allCheckStatus) {
        this.allCheckStatus = true;
      }
    } else {
      let index = this.selectedData.indexOf(val.data);
      this.selectedData.splice(index, 1);
      this.slectedDataChange.emit(this.selectedData);
      if (this.allCheckStatus) {
        this.allCheckStatus = false;
      }
    }
  }



  protected initGrid(): void {
    // this.settings=this.prepareSettings();
    this.type = this.settings.type ? this.settings.type : 'weight';
    this.source = this.prepareSource();
    this.grid = new Grid(
        this.source, this.settings,
        this.cdRef);  //当数据发生改变时，进入表格内部进行值检测
    // this.grid.onSelectRow().subscribe((row) => this.onSelectRow(row));
    //获取表格的列数目
    this.columns = this.grid.getColumns().length;
    if (this.settings.showCheckBox) {
      this.columns++;
    }
    if (this.settings.showDetailControl) {
      this.columns++;
    }
    if (this.settings.showRowIndex) {
      this.columns++;
    }
    //获取表格语言信息language
    this.lanServce.setlanguage(this.settings.language);
    this.number = this.lanServce.getlanguage('number');
    this.details = this.lanServce.getlanguage('detail');
    // source数据发生变化时，清空选中状态
    this.source.onChanged().subscribe((changes) => {
      this.allCheckStatusChange(false);

    });
  }
  // TODO:在此函数内部增加 根据配置生成source
  protected prepareSource(): DataSource {
    if (this.settings.source === 'local') {
      // let data=getDeepFromObject(this.settings,'localData');
      if (this.settings.localData && this.settings.localData instanceof Array) {
        return new LocalDataSource(this.settings);

      } else {
        throw new Error(
            'if the source is local,you should set localData as the instance of Array<any>');
      }
    } else if (this.settings.source === 'server') {
      let prepareDataOnLocal = this.settings.prepareDataOnLocal;
      let serverConf = this.settings.serverConf;
      let customGetdataFunction = this.settings.customGetdataFunction;
      return new ServerDataSource(
          this.http, serverConf, prepareDataOnLocal, customGetdataFunction);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['trRef'].previousValue);
    if (!!this.grid) {
      if (changes['settings']) {
        this.initGrid();
      }
      if (changes['refreshEmitter']) {
        this.refreshEmitter.subscribe((val) => {
          this.source.refresh();
        });
      }
      //如果source改为非@Input()的，那这里就无效了
      if (changes['source']) {
        this.grid.setSource(this.source);
      }
    } else {
      this.initGrid();
      if (!!this.refreshEmitter && changes['refreshEmitter']) {
        this.refreshEmitter.subscribe((val) => {
          this.source.refresh();
        });
      }
    }
  }
}
