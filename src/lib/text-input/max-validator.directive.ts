import {Attribute, Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidatorFn, Validators} from '@angular/forms';

import {NumberWrapperParseInt} from '../core/number-wrapper-parse-int';

@Directive({
  selector: '[max][ngModel],[max][formControl],[max][formControlName]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxValidator),
    multi: true
  }],
})

export class MaxValidator {
  private _validator: ValidatorFn;

  constructor(@Attribute('max') maxValue: string) {
    this._validator = max(NumberWrapperParseInt(maxValue, 10));
  }
  validate(c: AbstractControl): {[key: string]: any} {
    return this._validator(c);
  }
}

function max(maxvalue: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (Validators.required(control) !== undefined &&
        Validators.required(control) !== null) {
      return null;
    }
    let v: Number = Number(control.value);
    return v > maxvalue ?
        {'max': {'requiredValue': maxvalue, 'actualValue': v}} :
        null;
  };
}
