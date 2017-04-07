import {AfterViewInit, Component, EventEmitter, ExistingProvider, forwardRef, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {Option} from './option';
import {OptionList} from './option-list';
import {IOption} from './option.interface';
import {SelectDropdownComponent} from './select-dropdown.component';

export const SELECT_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};
/* tslint:disable */
@Component({
  selector: 'px-select',
  templateUrl: './select.component.html',
  styleUrls: ['../styles/select.component.css'],
  providers: [SELECT_VALUE_ACCESSOR]
  // encapsulation: ViewEncapsulation.None
})

export class SelectComponent implements AfterViewInit, ControlValueAccessor,
                                        OnChanges, OnInit {
  // @Input() options: Array<IOption>;
  @Input('options') cacheOptions: any[];
  options: Array<IOption>;
  @Input() allowClear: boolean = false;
  @Input() disabled: boolean = false;
  @Input() highlightColor: string;
  @Input() highlightTextColor: string;
  @Input() multiple: boolean = false;
  @Input() noFilter: number = 0;
  @Input() notFoundMsg: string = 'No results found';
  @Input() placeholder: string = '请选择';
  @Input() filterPlaceholder: string = '请选择';
  @Input('width') eleWidth: number = 400;
  @Input('displayProperty') label: string = '';
  @Input('bindProperty') bindProperty: string = '';

  @Output() opened: EventEmitter<null> = new EventEmitter<null>();
  @Output() closed: EventEmitter<null> = new EventEmitter<null>();
  @Output() selected: EventEmitter<IOption> = new EventEmitter<IOption>();
  @Output()
  deselected: EventEmitter<IOption|IOption[]> =
      new EventEmitter<IOption|IOption[]>();
  @Output() noOptionsFound: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('selection') selectionSpan: any;
  @ViewChild('dropdown') dropdown: SelectDropdownComponent;
  @ViewChild('filterInput') filterInput: any;

  private _value: Array<any> = [];
  private optionList: OptionList;
  // private hiddeSingle: boolean = false;

  // Selection state variables.
  hasSelected: boolean = false;

  // View state variables.
  private filterEnabled: boolean = true;
  private filterInputWidth: number = 1;
  private hasFocus: boolean = false;
  // private isBelow: boolean = true;
  private isDisabled: boolean = false;
  private isOpen: boolean = false;
  private placeholderView: string = '';

  private clearClicked: boolean = false;
  private selectContainerClicked: boolean = false;

  // Width and position for the dropdown container.
  private width: number;
  private top: number;
  private left: number;

  private onChange = (_: any) => {};
  private onTouched = () => {};
  // isMultiFilterHidden: boolean = false;

  /** Event handlers. **/

  // Angular lifecycle hooks.

  ngOnInit() {
    this.placeholderView = this.placeholder;
    this.filterPlaceholder = this.placeholder;
  }

  ngAfterViewInit() {
    this.updateFilterWidth();
  }

  ngOnChanges(changes: any) {
    if (changes.hasOwnProperty('cacheOptions')) {
      this.updateOptionsList(changes['cacheOptions'].isFirstChange());
    }
    if (changes.hasOwnProperty('noFilter')) {
      let numOptions: number = this.optionList.options.length;
      let minNumOptions: number = changes['noFilter'].currentValue;
      this.filterEnabled = numOptions >= minNumOptions;
    }
  }

  // Window.

  onWindowClick() {
    if (!this.selectContainerClicked) {
      this.closeDropdown();
    }
    this.clearClicked = false;
    this.selectContainerClicked = false;
  }

  onWindowResize() {
    this.updateWidth();
  }

  // Select container.

  onSelectContainerClick(event: any) {
    this.selectContainerClicked = true;
    if (!this.clearClicked) {
      this.toggleDropdown();
    }
  }

  onSelectContainerFocus() {
    this.onTouched();
  }

  onSelectContainerKeydown(event: any) {
    this.handleSelectContainerKeydown(event);
  }

  // Dropdown container.

  onDropdownOptionClicked(option: Option) {
    this.multiple ? this.toggleSelectOption(option) : this.selectOption(option);
    if (this.multiple) {
      setTimeout(() => {
        this.closeDropdown();
        this.openDropdown();
        this.isOpen = true;
      }, 0);
    }
  }

  onDropdownClose(focus: any) {
    this.closeDropdown(focus);
  }

  // Single filter input.

  onSingleFilterClick() {
    this.selectContainerClicked = true;
  }

  onSingleFilterInput(term: string) {
    let hasShown: boolean = this.optionList.filter(term);
    if (!hasShown) {
      this.noOptionsFound.emit(term);
    }
  }

  onSingleFilterKeydown(event: any) {
    this.handleSingleFilterKeydown(event);
  }

  // Multiple filter input.

  onMultipleFilterInput(event: any) {
    if (!this.isOpen) {
      this.openDropdown();
    }
    this.updateFilterWidth();
    setTimeout(() => {
      let term: string = event.target.value;
      let hasShown: boolean = this.optionList.filter(term);
      if (!hasShown) {
        this.noOptionsFound.emit(term);
      }
    });
  }

  // onMultipleFilterBlur() {
  //   if (this.isOpen) {
  //     this.isMultiFilterHidden = false;
  //   } else {
  //     this.isMultiFilterHidden = true;
  //   }
  //   console.log(this.isOpen, this.isMultiFilterHidden);
  // }

  onMultipleFilterKeydown(event: any) {
    this.handleMultipleFilterKeydown(event);
  }

  // Single clear select.

  onClearSelectionClick(event: any) {
    this.clearClicked = true;
    this.clearSelection();
    this.closeDropdown(true);
  }

  // Multiple deselect option.

  onDeselectOptionClick(option: Option) {
    this.clearClicked = true;
    this.deselectOption(option);
  }

  /** API. **/

  // TODO fix issues with global click/key handler that closes the dropdown.
  open() {
    this.openDropdown();
  }

  close() {
    this.closeDropdown();
  }

  clear() {
    this.clearSelection();
  }

  select(value: string) {
    this.optionList.getOptionsByValue(value).forEach((option) => {
      this.selectOption(option);
    });
  }

  /** ControlValueAccessor interface methods. **/

  writeValue(value: any) {
    if (value != undefined || (typeof(value) === 'object' && value !== null)) {
      this.value = value;
    }
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /** Value. **/

  get value(): string|string[] {
    return this.multiple ? this._value : this._value[0];
  }

  set value(v: string|string[]) {
    if (typeof v === 'undefined' || v === null || v === '') {
      v = [];
    } else if (typeof v === 'string') {
      v = [v];
    } else if (!Array.isArray(v)) {
      throw new TypeError('Value must be a string or an array.');
    }

    if (!OptionList.equalValues(v, this._value)) {
      this.optionList.value = v;
      this.valueChanged();
    }
  }

  private valueChanged() {
    this._value = this.optionList.value;

    this.hasSelected = this._value.length > 0;
    this.placeholderView = this.hasSelected ? '' : this.placeholder;
    this.updateFilterWidth();

    this.onChange(this.value);
  }

  /** Initialization. **/

  private updateOptionsList(firstTime: boolean) {
    let v: Array<string>;

    if (!firstTime) {
      v = this.optionList.value;
    }
    // cacheOptions transit options
    this.options = [];
    // todo cacheOptions undefine null
    this.cacheOptions = this.cacheOptions || [];
    this.cacheOptions.map(
        (cacheOption: any) => {this.options.push({
          'value': this.bindProperty ? cacheOption[this.bindProperty] :
                                       (cacheOption || ''),
          'label': this.label ? cacheOption[this.label] : (cacheOption || '')
        })});
    this.optionList = new OptionList(this.options);

    if (!firstTime) {
      this.optionList.value = v;
      // important
      if (v.length != 0) {
        this.valueChanged();
      }
    }
  }

  /** Dropdown. **/

  private toggleDropdown() {
    if (!this.isDisabled) {
      this.isOpen ? this.closeDropdown(true) : this.openDropdown();
    }
  }

  private openDropdown() {
    if (!this.isOpen) {
      this.updateWidth();
      this.updatePosition();
      this.isOpen = true;
      if (this.multiple && this.filterEnabled) {
        this.filterInput.nativeElement.focus();
      }
      this.opened.emit(null);
    }
    // this.onMultipleFilterBlur();
  }

  private closeDropdown(focus: boolean = false) {
    if (this.isOpen) {
      this.clearFilterInput();
      this.isOpen = false;
      if (focus) {
        this.focus();
      }
      this.closed.emit(null);
    }
    // this.onMultipleFilterBlur();
  }

  /** Select. **/

  private selectOption(option: Option) {
    if (!option.selected) {
      this.optionList.select(option, this.multiple);
      this.valueChanged();
      this.selected.emit(option.wrappedOption);
    }
  }

  private deselectOption(option: Option) {
    if (option.selected) {
      this.optionList.deselect(option);
      this.valueChanged();
      this.deselected.emit(option.wrappedOption);
      setTimeout(() => {
        if (this.multiple) {
          this.updatePosition();
          this.optionList.highlight();
          if (this.isOpen) {
            this.dropdown.moveHighlightedIntoView();
          }
        }
      });
    }
  }

  private clearSelection() {
    let selection: Array<Option> = this.optionList.selection;
    if (selection.length > 0) {
      this.optionList.clearSelection();
      this.valueChanged();

      if (selection.length === 1) {
        this.deselected.emit(selection[0].wrappedOption);
      } else {
        this.deselected.emit(selection.map((option) => {
          return option.wrappedOption;
        }));
      }
    }
  }

  private toggleSelectOption(option: Option) {
    option.selected ? this.deselectOption(option) : this.selectOption(option);
  }

  private selectHighlightedOption() {
    let option: Option = this.optionList.highlightedOption;
    if (option !== null) {
      this.selectOption(option);
      this.closeDropdown(true);
    }
  }

  private deselectLast() {
    let sel: Array<Option> = this.optionList.selection;

    if (sel.length > 0) {
      let option: Option = sel[sel.length - 1];
      this.deselectOption(option);
      this.setMultipleFilterInput(option.label + ' ');
    }
  }

  /** Filter. **/

  private clearFilterInput() {
    if (this.multiple && this.filterEnabled) {
      this.filterInput.nativeElement.value = '';
    } else {
      this.dropdown.clearFilterInput();
    }
  }

  private setMultipleFilterInput(value: string) {
    if (this.filterEnabled) {
      this.filterInput.nativeElement.value = value;
    }
  }

  /** Keys. **/

  private KEYS: any =
      {BACKSPACE: 8, TAB: 9, ENTER: 13, ESC: 27, SPACE: 32, UP: 38, DOWN: 40};

  private handleSelectContainerKeydown(event: any) {
    let key = event.which;

    if (this.isOpen) {
      if (key === this.KEYS.ESC || (key === this.KEYS.UP && event.altKey)) {
        this.closeDropdown(true);
      } else if (key === this.KEYS.TAB) {
        this.closeDropdown();
      } else if (key === this.KEYS.ENTER) {
        this.selectHighlightedOption();
      } else if (key === this.KEYS.UP) {
        this.optionList.highlightPreviousOption();
        this.dropdown.moveHighlightedIntoView();
        if (!this.filterEnabled) {
          event.preventDefault();
        }
      } else if (key === this.KEYS.DOWN) {
        this.optionList.highlightNextOption();
        this.dropdown.moveHighlightedIntoView();
        if (!this.filterEnabled) {
          event.preventDefault();
        }
      }
    } else {
      if (key === this.KEYS.ENTER || key === this.KEYS.SPACE ||
          (key === this.KEYS.DOWN && event.altKey)) {
        /* FIREFOX HACK:
         *
         * The setTimeout is added to prevent the enter keydown event
         * to be triggered for the filter input field, which causes
         * the dropdown to be closed again.
         */
        setTimeout(() => {
          this.openDropdown();
        });
      }
    }
  }

  private handleMultipleFilterKeydown(event: any) {
    let key = event.which;

    if (key === this.KEYS.BACKSPACE) {
      if (this.hasSelected && this.filterEnabled &&
          this.filterInput.nativeElement.value === '') {
        this.deselectLast();
      }
    }
  }

  private handleSingleFilterKeydown(event: any) {
    let key = event.which;

    if (key === this.KEYS.ESC || key === this.KEYS.TAB ||
        key === this.KEYS.UP || key === this.KEYS.DOWN ||
        key === this.KEYS.ENTER) {
      this.handleSelectContainerKeydown(event);
    }
  }

  /** View. **/

  focus() {
    this.hasFocus = true;
    if (this.multiple && this.filterEnabled) {
      this.filterInput.nativeElement.focus();
    } else {
      this.selectionSpan.nativeElement.focus();
    }
  }

  blur() {
    this.hasFocus = false;
    this.selectionSpan.nativeElement.blur();
  }

  private updateWidth() {
    this.width = this.selectionSpan.nativeElement.offsetWidth;
  }

  private updatePosition() {
    let e = this.selectionSpan.nativeElement;
    this.left = e.offsetLeft;
    this.top = e.offsetTop + e.offsetHeight;
  }

  private updateFilterWidth() {
    if (typeof this.filterInput !== 'undefined') {
      let value: string = this.filterInput.nativeElement.value;
      this.filterInputWidth =
          (value.length === 0 ? 12 + this.placeholderView.length * 10 :
                                1 + value.length * 10) < 52 ?
          52 :
          ((value.length === 0 ? 12 + this.placeholderView.length * 10 :
                                 1 + value.length * 10));
      // this.filterInputWidth = this.eleWidth;
    }
  }

  public myTransitionString(srcString: string) {
    return (srcString.length * 10 > this.width - 60) ?
        (srcString.substring(0, Math.floor((this.width - 60) / 10)) + '...') :
        srcString;
  }
}
