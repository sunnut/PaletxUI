import {EventEmitter} from '@angular/core';

export class PxMenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  routerLinkQueryParams?: any;
  eventEmitter?: EventEmitter<any>;
  items?: any[];
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
}
export interface MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  url?: string;
  routerLink?: any;
  eventEmitter?: EventEmitter<any>;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
}