import {Component, OnInit} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'px-progressbar-demo',
  templateUrl: 'progressbar.html',
  styleUrls: ['progressbar.css']
})

export class PxProgressbarDemoComponent implements OnInit {
  private infoPercent: number;

  ngOnInit() {
    this.infoPercent = 0;
    setInterval(() => {
      this.infoPercent = this.infoPercent === 100 ? 0 : this.infoPercent + 10;
    }, 2000);
  }

  progressbarCode: string = `
  <px-progressbar [percentage]="infoPercent" [type]="'page'" [bartype]="'info'"></px-progressbar>
  <px-progressbar [percentage]="'70'" [type]="'page'" [bartype]="'warning'"></px-progressbar>
  <px-progressbar [percentage]="infoPercent" [type]="'table'" [bartype]="'info'"></px-progressbar>
  <px-progressbar [percentage]="'70'" [type]="'table'" [bartype]="'warning'"></px-progressbar>`;
}
