import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {ChangeLogComponent} from './change-log/change-log.component';
import {DownloadComponent} from './download.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DownloadComponent, ChangeLogComponent]
})

export class DownloadModule {
}