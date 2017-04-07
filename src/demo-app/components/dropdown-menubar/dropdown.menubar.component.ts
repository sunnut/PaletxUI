import {Component} from '@angular/core';

@Component(
    {moduleId: module.id, templateUrl: 'dropdown.menubar.component.html'})

export class PxDropdownMenubarDemoComponent {
  public defaultDropdownMenubarCode: string =
      `  <div class="px-dropdown-menubar">
    <a><i class="fa fa-sitemap fa-lg"></i>默认左侧对齐<span class="caret"></span></a>
    <ul class="px-dropdown-menu">
      <li class="operation"><a>新建项目</a></li>
      <li class="divider"></li>
      <li class="px-dropdown-menugroup"><a>南京市</a></li>
      <li class="active" (click)="userInfo()"><a>南京一区</a></li>
      <li><a>南京雨花台三区</a></li>
      <li><a>南京秦淮区</a></li>
      <li class="divider"><a></a></li>
      <li class="px-dropdown-menugroup"><a>上海市</a></li>
      <li><a>上海一区</a></li>
      <li><a>上海浦东区</a></li>
      <li><a>上海三区</a></li>
    </ul>
  </div>`;

  public minWidthDropdownMenubarCode: string =
      `<div class="px-dropdown-menubar">
    <a>100px<span class="caret"></span></a>
    <ul class="px-dropdown-menu">
      <li><a>100px</a></li>
      <li><a>100px</a></li>
      <li><a>100px</a></li>
    </ul>
  </div>`;

  public rightAlignDropdownMenubarCode: string =
      `<div class="px-dropdown-menubar px-dropdown-rightalign">
    <a>右侧对齐<span class="caret"></span></a>
    <ul class="px-dropdown-menu">
      <li><a [routerLink]="['./']">比较长的子菜单项</a></li>
      <li><a href="javascript:;" (click)="userInfo()">个人信息</a></li>
      <li><a href="javascript:;" (click)="changePassword()">修改密码</a></li>
      <li><a href="javascript:;" (click)="logOut()">退出登录</a></li>
    </ul>
  </div>`;

  public rightAlignDropdownMenubarTsCode: string =
      `  public operationInfo: string = '操作展示';

  public userInfo() {
    this.operationInfo = '调用用户信息函数';
  }

  public changePassword() {
    this.operationInfo = '调用更改密码函数';
  }

  public logOut() {
    this.operationInfo = '调用退出登录函数';
  }`;

  public bindDropdownMenubarCode: string = `  <div class="px-dropdown-menubar">
    <a>{{selectedItem.menugroup}}-{{selectedItem.label}}<span class="caret"></span></a>
    <ul class="px-dropdown-menu">
      <li *ngFor="let menuItem of firstMenuItems"
          [ngClass]="{'px-dropdown-menugroup': menuItem.type =='menugroup',
          'divider': menuItem.type =='divider','operation':menuItem.type =='operation', 'active': checkActiveItem(menuItem)}">
        <a *ngIf="menuItem.click" href="javascript:;" (click)="menuItem.click(menuItem)">{{menuItem.label}}</a>
        <a *ngIf="!menuItem.click" href="javascript:;" >{{menuItem.label}}</a>
      </li>
    </ul>
  </div>`;

  public bindDropdownMenubarTsCode: string = `
  public selectedItem: any = {
    'label': '西安一区',
    'menugroup': '西安市'
  };
  public displayInfo: string = '当前在西安一区';

  public checkActiveItem(item: any) {
    // 检测对象或者对象某个属性相等or包含
    if (item) {
      return item.label === this.selectedItem.label;
    }
    return false;
  }

  public firstMenuItems = [
    {
      'label': '操作按钮',
      'type': 'operation',
      'click': (item: any) => {
        this.displayInfo = item.label;
      }
    },
    {
      'label': '',
      'type': 'divider'
    },
    {
      'label': '西安市',
      'type': 'menugroup'
    },
    {
      'label': '西安一区',
      'type': 'menuitem',
      'menugroup': '西安市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {
      'label': '西安二区',
      'type': 'menuitem',
      'menugroup': '西安市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {
      'label': '西安三区',
      'type': 'menuitem',
      'menugroup': '西安市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {
      'label': '',
      'type': 'divider'
    },
    {
      'label': '上海市',
      'type': 'menugroup'
    },
    {
      'label': '上海一区',
      'type': 'menuitem',
      'menugroup': '上海市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {
      'label': '上海二区',
      'type': 'menuitem',
      'menugroup': '上海市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {
      'label': '上海三区',
      'type': 'menuitem',
      'menugroup': '上海市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    }
  ];`;

  public selectedItem: any = {'label': '西安一区', 'menugroup': '西安市'};
  public displayInfo: string = '当前在西安一区';

  public checkActiveItem(item: any) {
    // 检测对象或者对象某个属性相等or包含
    if (item) {
      return item.label === this.selectedItem.label;
    }
    return false;
  }

  public firstMenuItems = [
    {
      'label': '操作按钮',
      'type': 'operation',
      'click': (item: any) => {
        this.displayInfo = item.label;
      }
    },
    {'label': '', 'type': 'divider'}, {'label': '西安市', 'type': 'menugroup'},
    {
      'label': '西安一区',
      'type': 'menuitem',
      'menugroup': '西安市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {
      'label': '西安二区',
      'type': 'menuitem',
      'menugroup': '西安市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {
      'label': '西安三区',
      'type': 'menuitem',
      'menugroup': '西安市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {'label': '', 'type': 'divider'}, {'label': '上海市', 'type': 'menugroup'},
    {
      'label': '上海一区',
      'type': 'menuitem',
      'menugroup': '上海市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {
      'label': '上海二区',
      'type': 'menuitem',
      'menugroup': '上海市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    },
    {
      'label': '上海三区',
      'type': 'menuitem',
      'menugroup': '上海市',
      'click': (item: any) => {
        this.displayInfo = '当前在' + item.label;
        this.selectedItem = item;
      }
    }
  ];

  public operationInfo: string = '操作展示';

  public userInfo() {
    this.operationInfo = '调用用户信息函数';
  }

  public changePassword() {
    this.operationInfo = '调用更改密码函数';
  }

  public logOut() {
    this.operationInfo = '调用退出登录函数';
  }
}