import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {BooleanFieldValue} from '../core/boolean-field-value';
import {UUID} from '../core/uuid';

const noop = () => {};

export const PX_TEXT_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PxTextInputComponent),
  multi: true
};

@Component({
  selector: 'px-text-input',
  templateUrl: 'text-input.html',
  styleUrls: ['../styles/text-input.css', 'text-input.css'],
  providers: [PX_TEXT_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class PxTextInputComponent implements ControlValueAccessor, OnInit {
  private _focused: boolean = false;
  private _value: any = '';

  /** Callback registered via registerOnTouched (ControlValueAccessor) */
  private _onTouchedCallback: () => void = noop;
  /** Callback registered via registerOnChange (ControlValueAccessor) */
  private _onChangeCallback: (_: any) => void = noop;

  /** Readonly properties. */
  get empty() {
    return this._value === null || this._value === '';
  }
  get inputId(): string {
    return `${this.id}`;
  }
  get isShowHintLabel() {
    return this._focused && this.hintLabel !== null;
  }
  get inputType() {
    return this.type === 'number' ? 'text' : this.type;
  }

  @Input() id: string = `px-input-${UUID.UUID()}`;
  @Input() name: string = null;
  @Input() hintLabel: string = null;
  @Input() @BooleanFieldValue() disabled: boolean = false;

  @Input() max: string|number = null;
  @Input() maxLength: number = null;
  @Input() min: string|number = null;
  @Input() minLength: number = null;
  @Input() placeholder: string = '';
  @Input() @BooleanFieldValue() readOnly: boolean = false;
  @Input() @BooleanFieldValue() required: boolean = false;
  @Input() @BooleanFieldValue() notShowOption: boolean = false;
  @Input() type: string = 'text';
  @Input() tabIndex: number = null;
  @Input() pattern: string = null;

  @Input() @BooleanFieldValue() shortInput: boolean = false;
  @Input() unit: string = null;
  @Input() prefix: string = null;

  @Input() precision: number = 0;
  @Input() step: number = 1;

  @Input() width: string = '400px';
  @Input() unitWidth: string = '70px';
  @Input() prefixWidth: string = '70px';

  get inputWidth() {
    if (this.unit !== null && this.prefix !== null) {
      return `calc(${this.width} - ${this.unitWidth} - ${this.prefixWidth})`;
    }

    if (this.unit !== null) {
      return `calc(${this.width} - ${this.unitWidth})`;
    }

    if (this.prefix !== null) {
      return `calc(${this.width} - ${this.prefixWidth})`;
    }
    return this.width;
  }


  keyPattern: RegExp = /[0-9\-]/;
  timer: any;

  get hasUnit() {
    return this.unit !== null;
  }
  get hasPrefix() {
    return this.prefix !== null;
  }
  get isFocus() {
    return this._focused;
  }

  private _blurEmitter: EventEmitter<FocusEvent> =
      new EventEmitter<FocusEvent>();
  private _focusEmitter: EventEmitter<FocusEvent> =
      new EventEmitter<FocusEvent>();

  @Output('blur')
  get onBlur(): Observable<FocusEvent> {
    return this._blurEmitter.asObservable();
  }

  @Output('focus')
  get onFocus(): Observable<FocusEvent> {
    return this._focusEmitter.asObservable();
  }

  @Input()
  set value(v: any) {
    v = this._convertValueForInputType(v);
    if (v !== this._value) {
      this._value = v;
      this._onChangeCallback(v);
    }
  }

  public ngOnInit() {
    if (this.shortInput) {
      this.width = '120px';
      this.unitWidth = '40px';
      this.prefixWidth = '40px';
    }
  }

  get value(): any {
    return this._value;
  }

  _handleFocus(event: FocusEvent) {
    this._focused = true;
    this._focusEmitter.emit(event);
  }

  _handleBlur(event: FocusEvent) {
    this._focused = false;
    this._onTouchedCallback();
    this._blurEmitter.emit(event);
  }

  _handleChange(event: Event) {
    this.value = (<HTMLInputElement>event.target).value;
    this._onTouchedCallback();
  }

  writeValue(value: any) {
    this._value = value;
  }

  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  private _convertValueForInputType(v: any): any {
    switch (this.type) {
      case 'number': {
        if (v === '' || v === '-') {
          return v;
        }
        if (this.precision) {
          return parseFloat(this.toFixed(v, this.precision));
        }
        return parseInt(v);
      }
      default:
        return v;
    }
  }

  private toFixed(value: number, precision: number) {
    return new Number(value).toFixed(precision);
  }

  repeat(interval: number, dir: number) {
    let i = interval || 500;

    this.clearTimer();
    this.timer = setTimeout(() => {
      this.repeat(40, dir);
    }, i);

    this.spin(dir);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  spin(dir: number) {
    let step = this.step * dir;
    let currentValue = this.value || 0;

    this.value = currentValue + step;

    if (this.maxLength !== null &&
        this.value.toString().length > this.maxLength) {
      this.value = currentValue;
    }

    if (this.min !== null && this.value < this.min) {
      this.value = this.min;
    }

    if (this.max !== null && this.value > this.max) {
      this.value = this.max;
    }

    this._onChangeCallback(this.value);
  }

  onUpButtonMousedown(event: Event, input: HTMLInputElement) {
    if (!this.disabled) {
      input.focus();
      this.repeat(null, 1);
      event.preventDefault();
    }
  }

  onUpButtonMouseup(event: Event) {
    if (!this.disabled) {
      this.clearTimer();
    }
  }

  onUpButtonMouseleave(event: Event) {
    if (!this.disabled) {
      this.clearTimer();
    }
  }

  onDownButtonMousedown(event: Event, input: HTMLInputElement) {
    if (!this.disabled) {
      input.focus();
      this.repeat(null, -1);
      event.preventDefault();
    }
  }

  onDownButtonMouseup(event: Event) {
    if (!this.disabled) {
      this.clearTimer();
    }
  }

  onDownButtonMouseleave(event: Event) {
    if (!this.disabled) {
      this.clearTimer();
    }
  }

  onInputKeydown(event: KeyboardEvent) {
    if (event.which == 38) {
      this.spin(1);
      event.preventDefault();
    } else if (event.which == 40) {
      this.spin(-1);
      event.preventDefault();
    }
  }

  onInputKeyPress(event: KeyboardEvent) {
    let inputChar = String.fromCharCode(event.charCode);
    if (this.type === 'number') {
      if (this.isIllegalNumberInputChar(event) ||
          this.isIllegalIntergerInput(inputChar) ||
          this.isIllegalFloatInput(inputChar)) {
        event.preventDefault();
      }
    }
  }

  private isIllegalNumberInputChar(event: KeyboardEvent) {
    /* 8:backspace, 46:. */
    return !this.keyPattern.test(String.fromCharCode(event.charCode)) &&
        event.which !== 46 && event.which !== 8 && event.which !== 0;
  }

  private isIllegalIntergerInput(inputChar: string) {
    return this.precision === 0 &&
        (inputChar === '.' ||
         (this._value.toString().length > 0 && inputChar === '-'));
  }

  private isIllegalFloatInput(inputChar: string) {
    return this.precision > 0 &&
        ((this._value.toString().length > 0 && inputChar === '-') ||
         ((this._value.toString() === '' ||
           this._value.toString().indexOf('.') > 0) &&
          inputChar === '.') ||
         (this._value.toString().indexOf('.') > 0 &&
          this._value.toString().split('.')[1].length == this.precision));
  }

  onInput(event: Event, inputValue: string) {
    this.value = inputValue;
  }
}
