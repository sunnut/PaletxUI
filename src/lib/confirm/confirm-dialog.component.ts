import {AfterViewInit, animate, Component, ContentChild, ElementRef} from '@angular/core';
import {EventEmitter, Input, OnDestroy, Renderer, state, style, transition, trigger} from '@angular/core';

import {DomHandler} from 'primeng/primeng';
import {Footer} from 'primeng/primeng';
import {Subscription} from 'rxjs/Subscription';

import {PxConfirmation, PxConfirmationService} from './confirmation.service';

@Component({
  selector: 'px-confirmDialog',
  template: `
        <div  class="ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all 
        ui-shadow" [ngClass]="{'ui-dialog-rtl':rtl}" 
            [style.display]="visible ? 'block' : 'none'" [style.width.px]="width" 
            [style.height.px]="height" (mousedown)="moveOnTop()" [@dialogState]="visible ? 'visible' : 'hidden'">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">
                <span class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <a href="#" role="button" *ngIf="closable" 
                    (click)="hide($event)">
                    <span class="iconfont px-icon-close"></span>
                </a>
                <!-- a class="ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all" 
                [ngClass]="{'ui-state-hover':hoverCloseIcon}" 
                href="#" role="button" *ngIf="closable" 
                    (click)="hide($event)" (mouseenter)="hoverCloseIcon=true" (mouseleave)="hoverCloseIcon=false">
                    <span class="fa fa-fw fa-close"></span>
                </a -->
            </div>
            <div class="ui-dialog-content ui-widget-content">
                <!-- i [class]="icon"></i -->
                <i [ngClass]="{'icon':true,'iconfont':true,'danger':isDangerConfirm}"  [class]="'px-icon-'+(icon||'exclamation-circle')"></i>
                <div class="ui-confirmdialog-message">
                    <div>{{message}}</div>
                    <div class="ui-confirmdialog-submessage">{{subMessage}}</div>
                </div>
            </div>
            <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" *ngIf="footer">
                <ng-content select="footer"></ng-content>
            </div>
            <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" *ngIf="!footer">
                <button *ngIf="isDangerConfirm" pxButton type="text" class="ui-button-danger" (click)="accept()" label="{{acceptLabel}}"></button>
                <button *ngIf="!isDangerConfirm" pxButton type="text" class="ui-button-primary" (click)="accept()" label="{{acceptLabel}}"></button>
                <button pxButton type="text" class="ui-button-info"  (click)="reject()" label="{{rejectLabel}}"></button>
            </div>
        </div>
    `,
  animations: [trigger(
      'dialogState',
      [
        state('hidden', style({opacity: 0})),
        state('visible', style({opacity: 1})),
        transition('visible => hidden', animate('400ms ease-in')),
        transition('hidden => visible', animate('400ms ease-out'))
      ])],
  providers: [DomHandler]
})

export class PxConfirmDialogComponent implements AfterViewInit, OnDestroy {
  @Input() public header: string;

  @Input() public icon: string;

  @Input() public message: string;

  @Input() public subMessage: string;

  @Input() public acceptIcon: string = 'fa-check';

  @Input() public acceptLabel: string = 'Yes';

  @Input() public acceptVisible: boolean = true;

  @Input() public rejectIcon: string = 'fa-close';

  @Input() public rejectLabel: string = 'No';

  @Input() public rejectVisible: boolean = true;

  @Input() public width: any = 600;

  @Input() public height: any;

  @Input() public closeOnEscape: boolean = true;

  @Input() public rtl: boolean;

  @Input() public closable: boolean = true;

  @Input() public responsive: boolean = true;

  @Input() public appendTo: any;

  @ContentChild(Footer) public footer: any;

  public confirmation: PxConfirmation;

  public _visible: boolean;

  public documentEscapeListener: any;

  public documentResponsiveListener: any;

  public mask: any;

  public contentContainer: any;

  public positionInitialized: boolean;

  public subscription: Subscription;

  public hoverCloseIcon: boolean;

  public isDangerConfirm = true;

  constructor(
      public el: ElementRef, public domHandler: DomHandler,
      public renderer: Renderer,
      private confirmationService: PxConfirmationService) {
    // this.iconClass = this.icon || 'exclamation-circle';
    this.subscription = this.confirmationService.requireConfirmation$.subscribe(
        (confirmation) => {

          this.confirmation = confirmation;
          /* this.iconClass =
           (this.confirmation.icon || this.icon || 'exclamation-circle') +
           ' ' + this.confirmation.type;*/
          this.isDangerConfirm =
              this.confirmation.type === 'danger' ? true : false;

          this.message = this.confirmation.message || this.message;
          this.subMessage = this.confirmation.subMessage || this.subMessage;
          this.icon = this.confirmation.icon || this.icon;
          this.header = this.confirmation.header || this.header;
          this.rejectVisible = this.confirmation.rejectVisible == null ?
              this.rejectVisible :
              this.confirmation.rejectVisible;
          this.acceptVisible = this.confirmation.acceptVisible == null ?
              this.acceptVisible :
              this.confirmation.acceptVisible;

          this.acceptLabel = this.confirmation.acceptLabel || this.acceptLabel;
          this.rejectLabel = this.confirmation.rejectLabel || this.rejectLabel;

          if (this.confirmation.accept) {
            this.confirmation.acceptEvent = new EventEmitter();
            this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
          }

          if (this.confirmation.reject) {
            this.confirmation.rejectEvent = new EventEmitter();
            this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
          }

          this.visible = true;
        });
  }

  public ngOnDestroy() {
    this.disableModality();

    if (this.responsive) {
      this.documentResponsiveListener();
    }

    if (this.closeOnEscape && this.closable) {
      this.documentEscapeListener();
    }

    if (this.appendTo && this.appendTo === 'body') {
      document.body.removeChild(this.el.nativeElement);
    }
    this.subscription.unsubscribe();
  }

  @Input()
  get visible(): boolean {
    return this._visible;
  }

  set visible(val: boolean) {
    this._visible = val;

    if (this._visible) {
      if (!this.positionInitialized) {
        this.center();
        this.positionInitialized = true;
      }

      this.el.nativeElement.children[0].style.zIndex = ++DomHandler.zindex;
    }

    if (this._visible) {
      this.enableModality();
    } else {
      this.disableModality();
    }
  }

  public ngAfterViewInit() {
    this.contentContainer =
        this.domHandler.findSingle(this.el.nativeElement, '.ui-dialog-content');

    if (this.responsive) {
      this.documentResponsiveListener =
          this.renderer.listenGlobal('window', 'resize', (event: any) => {
            this.center();
          });
    }

    if (this.closeOnEscape && this.closable) {
      this.documentEscapeListener =
          this.renderer.listenGlobal('body', 'keydown', (event: any) => {
            if (event.which === 27) {
              if (this.el.nativeElement.children[0].style.zIndex ===
                  DomHandler.zindex) {
                this.hide(event);
              }
            }
          });
    }

    if (this.appendTo) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.el.nativeElement);
      } else {
        this.domHandler.appendChild(this.el.nativeElement, this.appendTo);
      }
    }
  }

  public center() {
    let container = this.el.nativeElement.children[0];
    let elementWidth = this.domHandler.getOuterWidth(container);
    let elementHeight = this.domHandler.getOuterHeight(container);
    if (elementWidth === 0 && elementHeight === 0) {
      container.style.visibility = 'hidden';
      container.style.display = 'block';
      elementWidth = this.domHandler.getOuterWidth(container);
      elementHeight = this.domHandler.getOuterHeight(container);
      container.style.display = 'none';
      container.style.visibility = 'visible';
    }
    let viewport = this.domHandler.getViewport();
    let x = (viewport.width - elementWidth) / 2;
    let y = (viewport.height - elementHeight) / 2;

    container.style.left = x + 'px';
    container.style.top = y + 'px';
  }

  public enableModality() {
    if (!this.mask) {
      this.mask = document.createElement('div');
      this.mask.style.zIndex =
          this.el.nativeElement.children[0].style.zIndex - 1;
      this.domHandler.addMultipleClasses(
          this.mask, 'ui-widget-overlay ui-dialog-mask');
      document.body.appendChild(this.mask);
    }
  }

  public disableModality() {
    if (this.mask) {
      document.body.removeChild(this.mask);
      this.mask = null;
    }
  }

  public hide(event?: Event) {
    this.visible = false;

    if (event) {
      event.preventDefault();
    }
  }

  public moveOnTop() {
    this.el.nativeElement.children[0].style.zIndex = ++DomHandler.zindex;
  }

  public accept() {
    if (this.confirmation.acceptEvent) {
      this.confirmation.acceptEvent.emit();
    }

    this.hide();
    this.confirmation = null;
  }

  public reject() {
    if (this.confirmation.rejectEvent) {
      this.confirmation.rejectEvent.emit();
    }

    this.hide();
    this.confirmation = null;
  }
}
