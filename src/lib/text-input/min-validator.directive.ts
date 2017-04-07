import {Attribute, Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidatorFn, Validators} from '@angular/forms';

import {NumberWrapperParseInt} from '../core/number-wrapper-parse-int';

@Directive({
  selector: '[min][ngModel],[min][formControl],[min][formControlName]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinValidator),
    multi: true
  }],
})

export class MinValidator {
  private _validator: ValidatorFn;

  constructor(@Attribute('min') minValue: string) {
    this._validator = min(NumberWrapperParseInt(minValue, 10));
  }
  validate(c: AbstractControl): {[key: string]: any} {
    return this._validator(c);
  }
}

function min(minvalue: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (Validators.required(control) !== undefined &&
        Validators.required(control) !== null) {
      return null;
    }
    let v: Number = Number(control.value);
    return v < minvalue ?
        {'min': {'requiredValue': minvalue, 'actualValue': v}} :
        null;
  };
}
