import {Directive, ElementRef, Input} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

import {PxConfirmationService} from './confirmation.service';

declare type EventListenerOrEventListenerObject =
    EventListener | EventListenerObject;

@Directive({selector: '[pxConfirm]'})
export class PxConfirmDirective {
  @Input()
  public confirmMessage: string =
      'Are you sure that you want to perform this action?';
  @Input() public confirmSubMessage: string;
  @Input() public confirmHeader: string = 'Confirmation';
  @Input() public acceptLabel: string;
  @Input() public rejectLabel: string;
  @Input() public confirmType: string;

  constructor(
      private el: ElementRef,
      private confirmationService: PxConfirmationService,
      private translateService: TranslateService) {
    let element: HTMLElement = this.el.nativeElement;
    let oldAddEventListener: Function = element.addEventListener;
    let events: Object[] = [];

    function success(clickEvent: any) {
      events.forEach((evt: any) => {
        evt.listener(clickEvent);
      });
    }

    element.addEventListener('click', (clickEvent) => {
      let confirmHeader: string = null;
      let confirmMessage: string = null;
      let confirmSubMessage: string = null;
      let acceptLabel: string = null;
      let rejectLabel: string = null;

      if (this.confirmHeader) {
        confirmHeader = this.translateService.instant(this.confirmHeader);
      }
      if (this.confirmMessage) {
        confirmMessage = this.translateService.instant(this.confirmMessage);
      }
      if (this.confirmSubMessage) {
        confirmSubMessage =
            this.translateService.instant(this.confirmSubMessage);
      }
      if (this.acceptLabel) {
        acceptLabel = this.translateService.instant(this.acceptLabel);
      } else if (this.confirmHeader) {
        acceptLabel = confirmHeader;
      } else {
        acceptLabel = this.translateService.instant('share.confirm');
      }

      if (this.rejectLabel) {
        rejectLabel = this.translateService.instant(this.rejectLabel);
      } else {
        rejectLabel = this.translateService.instant('share.cancel');
      }

      this.confirmationService.confirm({
        'type': this.confirmType,
        'header': confirmHeader,
        'acceptLabel': acceptLabel,
        'rejectLabel': rejectLabel,
        'message': confirmMessage,
        'subMessage': confirmSubMessage,
        'accept': () => {
          success(clickEvent);
        }
      });
    });
    /* tslint:disable:only-arrow-functions */
    /* tslint:disable:parameters */
    element.addEventListener = function(
        type: string, listener: EventListenerOrEventListenerObject,
        useCapture?: boolean) {
      if ('click' === type) {
        events.push(
            {'type': type, 'listener': listener, 'useCapture': useCapture});
      } else {
        oldAddEventListener(type, listener, useCapture);
      }
    };
  }
}
