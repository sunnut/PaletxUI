/**
 * Created by 10206545 on 2016/11/28.
 */
import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {DataSource} from '../../data-source/dataSource';
import {LanService} from '../../service/language.service';

@Component({
  selector: 'sif-smart-table-pager',
  styles: [`
.ng2-smart-pagination {
  font-size:12px;
  font-family: "Microsoft yahei", Segoe UI, Arial ;
  display: inline-block;
  padding: 0;
  line-height:0;
  margin-top:0;
  color:#7c868d;
  margin-top:10px;
  margin-bottom:10px;
}
.ng2-smart-page-link{
    font-size:20px;
    text-decoration:none;
    color:#428bca;
    padding-left:6px;
    padding-right:6px;
    cursor: pointer;
    text-align: center;
}
.ng2-smart-pagination.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
.ng2-smart-pagination .ng2-smart-page-item {
  display: inline;

}
.ng2-smart-page-item select{
  width:45px ;
  border-color:#ddd;
  margin-left:1px  ;
  margin-right:1px ;
  font-size:12px;
  color:#7c868d;
  height:28px;
}
.ng2-smart-page-item  input{
  width:40px ;
  border:1px solid #ddd;
  font-size:12px;
  color:#7c868d;
}
.ng2-smart-page-item input:focus,
.ng2-smart-page-item select:focus
{
  outline:none;
  border:1px solid #5cb3fd ;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6) ;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6) ;

}
.ng2-smart-page-item.page-item span{
  letter-spacing:1px;
}
.ng2-smart-pagination-nav ul li.page-item select{
  padding:6px 5px 6px 12px;
}
.ng2-smart-pagination-nav ul:nth-child(2){
  margin-top:0;
  color: #4d5761;
}

.ng2-smart-pagination .ng2-smart-page-item:nth-child(1) {
  margin-right:7px;
  color: #4d5761;
}
.ng2-smart-pagination .ng2-smart-page-item:nth-child(2) {
    color: #4d5761;
}
.ng2-smart-pagination .ng2-smart-page-item:nth-child(3) {
  margin-right:2px;
  margin-left:12px;
    color: #4d5761;
}
.ng2-smart-pagination .ng2-smart-page-item:nth-child(4) {
  margin-right:1px;
    color: #4d5761;
}
.ng2-smart-pagination .ng2-smart-page-item:nth-child(5) {
  margin-right:2px;
    color: #4d5761;
}
.ng2-smart-page-item .ng2-smart-page-link {
  border:1px solid #ddd;
  height:26px;
  display: inline-block;
  vertical-align: top;
  font-size: 14px !important;
  color:#ddd;
}

.ng2-smart-pagination .ng2-smart-page-item:nth-child(6) .ng2-smart-page-link {
  padding-right:5px !important;
}
.ng2-smart-page-item .ng2-smart-page-link span{
  line-height:2;
}
`],
  template: `
  <nav  class="ng2-smart-pagination-nav">
    <ul class="ng2-smart-pagination" style="float: right">
     <li class="ng2-smart-page-item ">
            <span aria-hidden="true">{{totalView}}</span>
            <span aria-hidden="true">{{count}}</span>
            <span aria-hidden="true">{{recordsWithoutComma}}</span>
     </li>
     <li class="ng2-smart-page-item ">
            <span aria-hidden="true">{{views}}</span>
            <select #selectPerpage (change)="setPerpage(selectPerpage.value)">
                <option #initOption value="{{initPerPage}}">{{initPerPage}}</option>
                <option value="{{initPerPage+pageStep}}">{{initPerPage+pageStep}}</option>
                <option value="{{initPerPage+pageStep*2}}">{{initPerPage+pageStep*2}}</option>
                <option value="{{initPerPage+pageStep*3}}">{{initPerPage+pageStep*3}}</option>
            </select>
            <span aria-hidden="true">{{records}}</span>
     </li>
        <li class="ng2-smart-page-item ">
            <a class="ng2-smart-page-link">
                <span aria-hidden="true" (click)="previousPage()">&lt;</span>
            </a>
        </li>
        <li class="ng2-smart-page-item ">
            <input type="text" style="display: inline;width:45px;height: 28px;text-align:center" [(ngModel)]="page"
             #toPager id="search-box" (keyup)="listenKey($event)">
        </li>
        <li class="ng2-smart-page-item ">
           <span>/</span><span>{{getLast()}}</span> <span>{{totalPage}}</span>
        </li>
        <li class="ng2-smart-page-item ">
            <a class="ng2-smart-page-link" >
                <span aria-hidden="true" (click)="nextPage()" >&gt;</span>
            </a>
        </li>

    </ul>

  </nav>
  `
})
export class PagerComponent implements OnChanges, OnInit {
  @ViewChild('initOption') initoption: ElementRef;
  @Input() perPage: number;
  @Input() source: DataSource;
  @Input() pageStep: number;
  public initPerPage: number;
  public pages: Array<any>;
  public page: number;
  public count: number;
  views: string;
  records: string;
  recordsWithoutComma: string;
  totalView: string;
  pageNum: string;
  totalPage: string;
  timeout: any;
  delay: number = 2000;
  constructor(private lanService: LanService) {}
  ngOnInit() {
    this.views = this.lanService.getlanguage('view');
    this.records = this.lanService.getlanguage('records');
    this.recordsWithoutComma =
        this.lanService.getlanguage('recordsWithoutComma');
    this.totalView = this.lanService.getlanguage('totalview');
    this.pageNum = this.lanService.getlanguage('page');
    this.totalPage = this.lanService.getlanguage('totalPage');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['perPage']) {
      this.initPerPage = this.perPage;
      this.initoption.nativeElement.selected = true;  //
    }
    if (changes['source']) {
      this.source.onChanged().subscribe((change) => {
        this.page = this.source.getPaging().page;
        this.count = this.source.count();
        if (this.isPageOutOfBounce()) {
          this.source.setPage(--this.page);
        }
        this.processPageChange(change);
        this.initPages();
      });
    }
  }
  setPerpage(perpage: number): boolean {
    this.source.setPaging(1, perpage);
    this.perPage = perpage;
    return false;
  }
  /**
   * We change the page here depending on the action performed against data
   * source if a new element was added to the end of the table - then change the
   * page to the last if a new element was added to the beginning of the table -
   * then to the first page
   * @param changes
   */
  processPageChange(changes: any): void {
    if (changes['action'] === 'prepend') {
      this.source.setPage(1);
    }
    if (changes['action'] === 'append') {
      this.source.setPage(this.getLast());
    }
  }

  shouldShow(): boolean {
    return true;
    // return this.source.count() > this.perPage;
  }
  listenKey(event: any) {
    if (event.which === 13) {  // Enter
      this.paginate(this.page);
    } else if (event.which !== 9) {  // Table
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.paginate(this.page);
      }, this.delay);
    }
    return false;
  }
  paginate(page: number): boolean {
    page = Number(page);
    if (!!page && page > 0 && page <= this.getLast()) {
      this.source.setPage(page);
      this.page = page;
    }
    if (!!page && page <= 0) {
      this.source.setPage(1);
      this.page = 1;
    }
    if (!!page && page > this.getLast()) {
      this.page = this.getLast();
      this.source.setPage(this.page);
    }
    if (!page || page === 0) {
      this.source.setPage(1);
      this.page = 1;
    }
    return false;
  }
  previousPage() {
    this.paginate(Number(this.page) - 1);
  }
  nextPage() {
    this.paginate(Number(this.page) + 1);
  }
  getPage(): number {
    return this.page;
  }

  getPages(): Array<any> {
    return this.pages;
  }

  getLast(): number {
    let count = Math.ceil(this.count / this.perPage);
    if (isNaN(count)) {
      return 0;
    } else {
      return count;
    }
  }

  protected isPageOutOfBounce(): boolean {
    return (this.page * this.perPage) >= (this.count + this.perPage) &&
        this.page > 1;
  }

  protected initPages() {
    let pagesCount = this.getLast();
    let showPagesCount = 4;
    showPagesCount = pagesCount < showPagesCount ? pagesCount : showPagesCount;
    this.pages = [];

    if (this.shouldShow()) {
      let middleOne = Math.ceil(showPagesCount / 2);
      middleOne = this.page >= middleOne ? this.page : middleOne;

      let lastOne = middleOne + Math.floor(showPagesCount / 2);
      lastOne = lastOne >= pagesCount ? pagesCount : lastOne;

      let firstOne = lastOne - showPagesCount + 1;

      for (let i = firstOne; i <= lastOne; i++) {
        this.pages.push(i);
      }
    }
  }
}
