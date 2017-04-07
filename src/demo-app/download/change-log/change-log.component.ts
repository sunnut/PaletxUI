import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'change-log',
  templateUrl: 'change-log.html',
  styleUrls: ['change-log.css']
})

export class ChangeLogComponent {
  @Input() version: string;
  @Input() updateTime: string;
  @Input() newContents: any[];
  @Input() bugFixContents: any[];
}