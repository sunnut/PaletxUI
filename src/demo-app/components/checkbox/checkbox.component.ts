import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: 'check-box.html',
  styleUrls: ['check-box.css'],
})

export class PxCheckboxDemoComponent {
  checkbox1 = `
  <li class="view" *ngFor="let o of options" >
    <px-checkbox #input [name]="o.name" value="o.value" (change)="setCheck(o.value,input.checked)">
            {{o.value}}
    </px-checkbox>
  </li>`;
}
