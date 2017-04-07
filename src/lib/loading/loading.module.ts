/**
 * Created by 10156312 on 2016/12/15.
 */
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PxLoadingComponent} from './loading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PxLoadingComponent],
  exports: [PxLoadingComponent]
})

export class PxLoadingModule {
}
