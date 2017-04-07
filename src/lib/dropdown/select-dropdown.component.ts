import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';


import {Option} from './option';
import {OptionList} from './option-list';

@Component({
  selector: 'select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['../styles/select-dropdown.component.css']
  // encapsulation: ViewEncapsulation.None
})

export class SelectDropdownComponent implements AfterViewInit, OnChanges,
                                                OnInit {
  @Input() filterEnabled: boolean;
  @Input() highlightColor: string;
  @Input() highlightTextColor: string;
  @Input() left: number;
  @Input() multiple: boolean;
  @Input() notFoundMsg: string;
  @Input() optionList: OptionList;
  @Input() top: number;
  @Input() width: number;
  @Input() placeholder: string;
  @Input() scrollLength: number = 8;

  @Output() close = new EventEmitter<boolean>();
  @Output() optionClicked = new EventEmitter<Option>();
  @Output() singleFilterClick = new EventEmitter<null>();
  @Output() singleFilterInput = new EventEmitter<string>();
  @Output() singleFilterKeydown = new EventEmitter<any>();

  @ViewChild('filterInput') filterInput: any;
  @ViewChild('optionsList') optionsList: any;
  singleFilterValue: string = '';

  disabledColor: string = '#fff';
  disabledTextColor: string = '9e9e9e';
  isNeedScroll: boolean = false;

  /** Event handlers. **/

  // Angular life cycle hooks.

  ngOnInit() {
    this.optionsReset();
    this.singleFilterValue = (this.optionList.hasSelected()) ?
        (this.optionList.selection[0].label) :
        '';
  }

  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('optionList')) {
      this.optionsReset();
      let optionListnoSelectedLength =
          this.optionList.options.length - this.optionList.selection.length;
      if (this.multiple && optionListnoSelectedLength > this.scrollLength) {
        this.isNeedScroll = true;
      } else if (
          this.multiple == false &&
          (this.optionList.options).length > this.scrollLength) {
        this.isNeedScroll = true;
      }
    }
  }

  ngAfterViewInit() {
    this.moveHighlightedIntoView();
    if (!this.multiple && this.filterEnabled) {
      this.filterInput.nativeElement.focus();
    }
  }

  // Filter input (single select).

  onSingleFilterClick(event: any) {
    this.singleFilterClick.emit(null);
  }

  onSingleFilterInput(event: any) {
    this.singleFilterInput.emit(event.target.value);
  }

  onSingleFilterKeydown(event: any) {
    this.singleFilterKeydown.emit(event);
  }

  // Options list.

  onOptionsWheel(event: any) {
    this.handleOptionsWheel(event);
  }

  onOptionMouseover(option: Option) {
    this.optionList.highlightOption(option);
  }

  onOptionClick(option: Option) {
    this.optionClicked.emit(option);
    return false;
  }

  /** Initialization. **/

  private optionsReset() {
    this.optionList.filter('');
    this.optionList.highlight();
  }

  /** View. **/

  getOptionStyle(option: Option): any {
    if (option.highlighted) {
      let style: any = {};
      // if (this.isNeedScroll) {
      //   // 8*36
      //   style['max-height.px'] = this.scrollLength * 36;
      // }
      if (typeof this.highlightColor !== 'undefined') {
        style['background-color'] = this.highlightColor;
      }
      if (typeof this.highlightTextColor !== 'undefined') {
        style['color'] = this.highlightTextColor;
      }
      return style;
    } else {
      return {};
    }
  }

  clearFilterInput() {
    if (this.filterEnabled) {
      this.filterInput.nativeElement.value = '';
    }
  }

  moveHighlightedIntoView() {
    let list = this.optionsList.nativeElement;
    let listHeight = list.offsetHeight;

    let itemIndex = this.optionList.getHighlightedIndex();

    if (itemIndex > -1) {
      let item = list.children[0].children[itemIndex];
      let itemHeight = item.offsetHeight;

      let itemTop = itemIndex * itemHeight;
      let itemBottom = itemTop + itemHeight;

      let viewTop = list.scrollTop;
      let viewBottom = viewTop + listHeight;

      if (itemBottom > viewBottom) {
        list.scrollTop = itemBottom - listHeight;
      } else if (itemTop < viewTop) {
        list.scrollTop = itemTop;
      }
    }
  }

  private handleOptionsWheel(e: any) {
    let div = this.optionsList.nativeElement;
    let atTop = div.scrollTop === 0;
    let atBottom = div.offsetHeight + div.scrollTop === div.scrollHeight;

    if (atTop && e.deltaY < 0) {
      e.preventDefault();
    } else if (atBottom && e.deltaY > 0) {
      e.preventDefault();
    }
  }
}
