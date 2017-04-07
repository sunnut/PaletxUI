import {Component} from '@angular/core';

@Component(
    {moduleId: module.id, templateUrl: 'radio.html', styleUrls: ['radio.css']})

export class PxRadioDemoComponent {
  options =
      [{label: 'ZX5960 ', value: 'true'}, {label: 'ZX5960 ', value: 'false'}];

  chosenOption1: string;
  chosenOption2: string;
  chosenOption3: string;
  radioHtml1 = `
  <px-radio-group [(ngModel)]="chosenOption" [ngModelOptions]="{standalone:true}">
    <px-radio-button *ngFor="let o of options" [value]="o.value">{{o.label}}</px-radio-button>
  </px-radio-group>`;
  radioHtml2 = `
  <px-radio-group [(ngModel)]="chosenOption1" [ngModelOptions]="{standalone:true}">
    <px-radio-button [value]='"true"' [disabled]='false'>是</px-radio-button>
    <px-radio-button [value]='"false"' [disabled]='true'>否</px-radio-button>
  </px-radio-group>`;
  radioHtml3 = `
  <px-radio-group [(ngModel)]="chosenOption3" [ngModelOptions]="{standalone:true}" [disabled]="true">
    <px-radio-button *ngFor="let o of options" [value]="o.value">{{o.label}}</px-radio-button>
  </px-radio-group>`;
  radioTs = `
  export class PxRadioDemoComponent {
    options = [
      {
        label: '\u662f',
        value: 'true'
      },{
        label: '\u5426',
        value: 'false'
      }
    ];

    chosenOption1:string;
    chosenOption2:string;
    chosenOption3:string;
    ngOnInit() {
      this.chosenOption1 = this.options[0].value;
      this.chosenOption2 = 'false';
      this.chosenOption3 = this.options[0].value;
    }
  }`;
  radioHtml21 = `
   <px-radioButton name="testradio" *ngFor="let o of options" [value]="o.value" [(ngModel)]="chosenOption1" label="{{o.label}}"></px-radioButton>`;
  radioHtml22 = `
  <px-radioButton name="testradio2" [value]="true" [(ngModel)]="chosenOption1" label="是" disabled></px-radioButton>
      <px-radioButton name="testradio2" [value]="false" [(ngModel)]="chosenOption1" label="否" disabled></px-radioButton>`;


  ngOnInit() {
    this.chosenOption1 = this.options[0].value;
    this.chosenOption2 = 'true';
    this.chosenOption3 = this.options[1].value;
  }
}
