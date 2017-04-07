import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'px-card',
  templateUrl: 'card.html',
  styleUrls: ['../styles/card.css']
})

export class PxCardComponent implements OnInit {
  @Input() title: string;
  @Input() disappear: number = 3;
  @Output() showChange = new EventEmitter<boolean>();


  ngOnInit() {}
}
