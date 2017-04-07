import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {Ipv4Validator} from './ipv4-validator.directive';
import {MaxValidator} from './max-validator.directive';
import {MinValidator} from './min-validator.directive';
import {PxTextInputConnectorComponent} from './text-input-connector.component';
import {PxTextInputComponent} from './text-input.component';
import {ValidateOnBlurDirective} from './validate-onblur.directive';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    PxTextInputComponent, Ipv4Validator, MaxValidator, MinValidator,
    ValidateOnBlurDirective, PxTextInputConnectorComponent
  ],
  exports: [
    PxTextInputComponent, Ipv4Validator, MaxValidator, MinValidator,
    ValidateOnBlurDirective, PxTextInputConnectorComponent
  ]
})

export class PxTextInputModule {
}
