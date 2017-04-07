import {Injectable} from '@angular/core';

@Injectable()
export class PxTabsetConfig {
  /** provides default navigation context class: 'tabs' or 'pills' */
  public type: string = 'tabs';
}