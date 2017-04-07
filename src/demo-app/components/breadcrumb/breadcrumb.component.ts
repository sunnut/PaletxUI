import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'px-breadcrumb-demo',
  templateUrl: 'breadcrumb.html'
})

export class PxBreadcrumbDemoComponent {
  absoluteLinks: any = [{name: 'paletxUI', url: '/home'}, {name: '面包屑'}];
  relativeLinks: any = [
    {
      name: 'paletxUI',
      url: '../tooltip',
      params: {'param1': 'param-bymyself'},
      relative: true
    },
    {name: '面包屑'}
  ];

  absouteLinksHtmlCode: string =
      `<px-breadcrumb [links]="absoluteLinks" ></px-breadcrumb>`;
  absouteLinksTsCode: string = `absoluteLinks:any = [
    {name:'paletxUI', url:'/home'},
    {name:'面包屑', url:''}
];`;

  relativeLinksHtmlCode: string =
      `<px-breadcrumb [links]="relativeLinks" ></px-breadcrumb>`;
  relativeLinksTsCode: string = `relativeLinks:any = [
    {
      name: 'paletxUI',
      url: '../tooltip',
      params: {'param1': 'param-bymyself'},
      relative: true},
    {name:'面包屑', url:''}
];`;
}
