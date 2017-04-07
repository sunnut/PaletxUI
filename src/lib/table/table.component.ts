import {Component} from '@angular/core';

import {LanService} from './smart-table/service/language.service';
import {ViewContainerService} from './smart-table/service/viewContainer.service';
import {SmartTableComponent} from './smart-table/smart-table.component';

@Component({
  selector: 'px-table',
  templateUrl: './smart-table/smart-table.html',
  styleUrls: ['./smart-table/smart-table.css', '../styles/table.css'],
  providers: [ViewContainerService, LanService]
})

export class PxTableComponent extends SmartTableComponent {
}