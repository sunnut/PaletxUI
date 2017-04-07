import {AfterContentInit, Component, ContentChildren, Directive, EventEmitter, forwardRef} from '@angular/core';
import {HostBinding, HostListener, Input, OnInit, Optional, Output, QueryList} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {UUID} from '../core/index';
import {PxUniqueSelectionDispatcher} from '../core/index';

/**
 * Provider Expression that allows ky-radio-group to register as a
 * ControlValueAccessor. This
 * allows it to support [(ngModel)] and ngControl.
 */
export const PX_RADIO_GROUP_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PxRadioGroup),
  multi: true
};

/** A simple change event emitted by either PxRadioButton or PxRadioGroup. */
export class PxRadioChange {
  source: PxRadioButton;
  value: any;
}

@Directive({
  selector: 'px-radio-group',
  providers: [PX_RADIO_GROUP_CONTROL_VALUE_ACCESSOR]
})
export class PxRadioGroup implements AfterContentInit, ControlValueAccessor {
  /**
   * Selected value for group. Should equal the value of the selected radio
   * button if there *is*
   * a corresponding radio button with a matching value. If there is *not* such
   * a corresponding
   * radio button, this value persists to be applied in case a new radio button
   * is added with a
   * matching value.
   */
  private _value: any = null;

  /** The HTML name attribute applied to radio buttons in this group. */
  private _name: string = `px-radio-group-${UUID.UUID()}`;

  /** Disables all individual radio buttons assigned to this group. */
  private _disabled: boolean = false;

  /** The currently selected radio button. Should match value. */
  private _selected: PxRadioButton = null;

  /** Whether the `value` has been set to its initial value. */
  private _isInitialized: boolean = false;

  /** The method to be called in order to update ngModel */
  private _controlValueAccessorChangeFn: (value: any) => void = () => {};

  /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
  onTouched: () => any = () => {};

  /** Event emitted when the group value changes. */
  @Output()
  change: EventEmitter<PxRadioChange> = new EventEmitter<PxRadioChange>();

  /** Child radio buttons. */
  @ContentChildren(forwardRef(() => PxRadioButton))
  _radios: QueryList<PxRadioButton> = null;

  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }

  @Input() align: 'start'|'end';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value) {
    // The presence of *any* disabled value makes the component disabled,
    // *except* for false.
    this._disabled = (value !== null && value !== false) ? true : null;
  }

  @Input()
  get value(): any {
    return this._value;
  }

  set value(newValue: any) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with
      // selection.
      this._value = newValue;

      this._updateSelectedRadioFromValue();

      // Only fire a change event if this isn't the first time the value is ever
      // set.
      if (this._isInitialized) {
        this._emitChangeEvent();
      }
    }
  }

  @Input()
  get selected() {
    return this._selected;
  }

  set selected(selected: any) {
    this._selected = selected;
    this.value = selected ? selected.value : null;

    if (selected && !selected.checked) {
      selected.checked = true;
    }
  }

  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   * TODO: internal
   */
  ngAfterContentInit() {
    // Mark this component as initialized in AfterContentInit because the
    // initial value can
    // possibly be set by NgModel on PxRadioGroup, and it is possible that the
    // OnInit of the
    // NgModel occurs *after* the OnInit of the PxRadioGroup.
    this._isInitialized = true;
  }

  /**
   * Mark this group as being "touched" (for ngModel). Meant to be called by the
   * contained
   * radio buttons upon their blur.
   */
  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private _updateRadioButtonNames(): void {
    if (this._radios !== null) {
      this._radios.forEach(radio => {
        radio.name = this.name;
      });
    }
  }

  /** Updates the `selected` radio button from the internal _value state. */
  private _updateSelectedRadioFromValue(): void {
    // If the value already matches the selected radio, do nothing.
    let isAlreadySelected =
        this._selected !== null && this._selected.value === this._value;

    if (this._radios !== null && !isAlreadySelected) {
      let matchingRadio =
          this._radios.filter(radio => radio.value === this._value)[0];

      if (matchingRadio) {
        this.selected = matchingRadio;
      } else if (this.value === null) {
        this.selected = null;
        this._radios.forEach(radio => {
          radio.checked = false;
        });
      }
    }
  }

  /** Dispatch change event with current selection and group value. */
  private _emitChangeEvent(): void {
    let event = new PxRadioChange();
    event.source = this._selected;
    event.value = this._value;
    this._controlValueAccessorChangeFn(event.value);
    this.change.emit(event);
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    this.value = value;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}

@Component({
  //
  selector: 'px-radio-button',
  templateUrl: 'radio.html',
  styleUrls: ['../styles/radio.css'],
})

export class PxRadioButton implements OnInit {
  _isFocused: boolean;

  /** Whether this radio is checked. */
  private _checked: boolean = false;

  private _isHoverd: boolean = false;

  /** The unique ID for the radio button. */
  @HostBinding('id') @Input()
  id: string = `px-radio-${UUID.UUID()}`;

  /** Analog to HTML 'name' attribute used to group radios for unique selection.
   */
  @Input()
  name: string = `px-radio-${UUID.UUID()}`;

  /** Whether this radio is disabled. */
  private _disabled: boolean;

  /** Value assigned to this radio.*/
  private _value: any = null;

  /** The parent radio group. May or may not be present. */
  radioGroup: PxRadioGroup;

  /** Event emitted when the group value changes. */
  @Output()
  change: EventEmitter<PxRadioChange> = new EventEmitter<PxRadioChange>();

  constructor(
      @Optional() radioGroup: PxRadioGroup,
      public radioDispatcher: PxUniqueSelectionDispatcher) {
    // Assertions. Ideally these should be stripped out by the compiler.
    this.radioGroup = radioGroup;

    if (!!this.radioGroup) {
      radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
        }
      });
    }
  }

  get inputId(): string {
    return `${this.id}-input`;
  }

  @Input()
  get checked(): boolean {
    return this._checked;
  }

  set checked(newCheckedState: boolean) {
    if (newCheckedState) {
      // Notify all radio buttons with the same name to un-check.
      this.radioDispatcher.notify(this.id, this.name);
    }

    if (newCheckedState !== this._checked) {
      this._emitChangeEvent();
    }

    this._checked = newCheckedState;

    if (newCheckedState && this.radioGroup &&
        this.radioGroup.value !== this.value) {
      this.radioGroup.selected = this;
    }
  }

  /** PxRadioGroup reads this to assign its own value. */
  @Input()
  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (this._value !== value) {
      if (this.radioGroup !== null && this.checked) {
        this.radioGroup.value = value;
      }
      this._value = value;
    }
  }

  private _align: 'start'|'end';

  @Input()
  get align(): 'start'|'end' {
    return this._align || (this.radioGroup !== null && this.radioGroup.align) ||
        'start';
  }

  set align(value: 'start'|'end') {
    this._align = value;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled ||
        (this.radioGroup !== null && this.radioGroup.disabled);
  }

  set disabled(value: boolean) {
    // The presence of *any* disabled value makes the component disabled,
    // *except* for false.
    this._disabled = (value !== null && value !== false) ? true : null;
  }

  /** TODO: internal */
  ngOnInit() {
    if (this.radioGroup) {
      // If the radio is inside a radio group, determine if it should be checked
      this.checked = this.radioGroup.value === this._value;
      // Copy name from parent radio group
      this.name = this.radioGroup.name;
    }
  }

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    let event = new PxRadioChange();
    event.source = this;
    event.value = this._value;
    this.change.emit(event);
  }

  @HostListener('click')
  _onClick() {
    if (this.disabled) {
      return;
    }

    if (this.radioGroup !== null) {
      // Propagate the change one-way via the group, which will in turn mark
      // this
      // button as checked.
      this.radioGroup.selected = this;
      this.radioGroup._touch();
    } else {
      this.checked = true;
    }
  }

  /**
   * We use a hidden native input field to handle changes to focus state via
   * keyboard navigation,
   * with visual rendering done separately. The native element is kept in sync
   * with the overall
   * state of the component.
   */
  _onInputFocus() {
    this._isFocused = true;
  }

  _onInputBlur() {
    this._isFocused = false;
    if (this.radioGroup) {
      this.radioGroup._touch();
    }
  }

  _onLabelHover() {
    this._isHoverd = true;
  }

  _onLabelHoverLeave() {
    this._isHoverd = false;
  }

  /**
   * Checks the radio due to an interaction with the underlying native <input
   * type="radio">
   */
  _onInputChange(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    this.checked = true;
    if (this.radioGroup) {
      this.radioGroup._touch();
    }
  }
}
export const PX_RADIO_DIRECTIVES = [PxRadioGroup, PxRadioButton];
