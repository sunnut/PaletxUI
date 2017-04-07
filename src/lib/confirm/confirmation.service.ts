import {EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export interface PxConfirmation {
  message: string;
  subMessage?: string;
  key?: string;
  icon?: string;
  type?: string;
  header?: string;
  accept?: Function;
  reject?: Function;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptEvent?: EventEmitter<any>;
  rejectEvent?: EventEmitter<any>;
}

export class PxConfirmationService {
  public requireConfirmation$: Observable<PxConfirmation> = null;
  public accept: Observable<PxConfirmation> = null;

  private requireConfirmationSource: Subject<PxConfirmation> = null;
  private acceptConfirmationSource: Subject<PxConfirmation> = null;

  constructor() {
    this.requireConfirmationSource = new Subject<PxConfirmation>();
    this.acceptConfirmationSource = new Subject<PxConfirmation>();

    this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
    this.accept = this.acceptConfirmationSource.asObservable();
  }

  public confirm(confirmation: PxConfirmation) {
    // console.log(confirmation);
    this.requireConfirmationSource.next(confirmation);
    return this;
  }

  public onAccept() {
    this.acceptConfirmationSource.next();
  }
}
