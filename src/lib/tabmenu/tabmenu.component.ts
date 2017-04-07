import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomHandler} from 'primeng/primeng';

import {PxMenuItem} from '../common/api';

@Component({
  selector: 'px-tabMenu',
  template: `
        <div [ngClass]="'ui-tabmenu ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <ul class="ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                <li *ngFor="let item of model" 
                    [ngClass]="{'ui-tabmenuitem ui-state-default ui-corner-top':true,'ui-state-disabled':item.disabled,
                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-active':activeItem==item}">
                    <a [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" (click)="itemClick($event,item)"
                        [attr.target]="item.target">
                        <span class="ui-menuitem-icon fa" [ngClass]="item.icon"></span>
                        <span class="ui-menuitem-text">{{item.label|translate}}</span>
                    </a>
                </li>
            </ul>
        </div>
    `,
  providers: [DomHandler]
})
export class PxTabMenuComponent implements OnInit, OnDestroy {
  @Input() public model: PxMenuItem[];

  @Input() public activeItem: PxMenuItem;

  @Input() public popup: boolean;

  @Input() public style: any;

  @Input() public styleClass: string;

  constructor(public router: Router, private activatedRoute: ActivatedRoute) {}

  public ngOnInit() {
    let that = this;
    if (!this.activeItem && this.model && this.model.length) {
      let _index = this.model.findIndex((m: PxMenuItem) => {
        let cruntUrlTree = this.router.createUrlTree(
            m.routerLink, {relativeTo: that.activatedRoute});
        return that.router.isActive(cruntUrlTree, false);
      });
      if (_index !== -1) {
        this.activeItem = this.model[_index];
      } else {
        this.activeItem = this.model[0];
      }
    }
  }

  public itemClick(event: Event, item: PxMenuItem) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    if (!item.url || item.routerLink) {
      event.preventDefault();
    }

    if (item.command) {
      if (!item.eventEmitter) {
        item.eventEmitter = new EventEmitter();
        item.eventEmitter.subscribe(item.command);
      }

      item.eventEmitter.emit({'originalEvent': event, 'item': item});
    }

    if (item.routerLink) {
      this.router.navigate(item.routerLink, {
        queryParams: item.routerLinkQueryParams,
        relativeTo: this.activatedRoute
      });
    }

    this.activeItem = item;
  }

  public ngOnDestroy() {
    if (this.model) {
      for (let item of this.model) {
        this.unsubscribe(item);
      }
    }
  }

  private unsubscribe(item: any) {
    if (item.eventEmitter) {
      item.eventEmitter.unsubscribe();
    }

    if (item.items) {
      for (let childItem of item.items) {
        this.unsubscribe(childItem);
      }
    }
  }
}
