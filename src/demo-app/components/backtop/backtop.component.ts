import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'demo-backtop',
  templateUrl: './backtop.html'
})

export class PxBacktopDemoComponent {
  numbers: any;
  appHtmlCode: string;

  constructor() {
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.appHtmlCode = `<px-backtop scrollspeed=600></px-backtop>`;
  }
}
