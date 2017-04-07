import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({selector: '[validate-on-blur]'})

export class ValidateOnBlurDirective {
  constructor(public formControl: NgControl) {}

  @HostListener('focus')
  onFocus() {
    this.formControl.control.markAsUntouched(false);
  }

  @HostListener('blur')
  onBlur() {
    this.formControl.control.markAsTouched(true);
  }
}