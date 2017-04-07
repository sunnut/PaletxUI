import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({

  selector: 'px-textarea',
  templateUrl: 'textarea.component.html',
  styleUrls: ['../styles/textarea.css']
})

export class TextareaComponent {
  @Input() textContext: string;
  @Input() maxContext: number;
  @Input() textRows: number;
  @Input() textCols: number;
  @Input() tipContent: string;
  @Output() textContextChange = new EventEmitter<string>();
  constructor() {
    this.maxContext = 0;
    this.textContext = '';
    this.tipContent = '';
  }

  mychange() {
    this.textContextChange.emit(this.textContext);
  }
}