/**
 * Created by 10206545 on 2016/11/28.
 */
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver} from '@angular/core';
import {EventEmitter, Input, OnDestroy, Output, ViewChild, ViewContainerRef} from '@angular/core';

import {Cell} from '../../data-set/cell';
import {ViewContainerService} from '../../service/viewContainer.service';


@Component({
  selector: 'sif-smart-table-cell',
  styles: [`
        .zenap-smart-table input {
          width: 100%;
          line-height: normal;
          padding: .375rem .75rem;
          display: inline;
        }
    `],
  template: `
    <div *ngIf="cell.getColumn().type !== 'html'&&cell.getColumn().type !== 'component'">{{ cell.getValue() }}</div>
    <div *ngIf="cell.getColumn().type === 'html'" [innerHTML]="cell.getValue()"></div>
    <div *ngIf="cell.getColumn().type === 'component'&& cell.getColumn().component"  #vc></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements AfterViewInit, OnDestroy {
  @Input() ref: any;
  @Input() cell: Cell;
  @Input() inputClass: string = '';
  @Input() trIndex: number;
  @Input() columns: number;
  @Output() public edited: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  innerConponent: any;
  constructor(
      private componentResolver: ComponentFactoryResolver,
      private cgRef: ChangeDetectorRef,
      private viewContainerService: ViewContainerService) {}

  ngAfterViewInit() {
    if (this.cell.getColumn().type === 'component' &&
        !!this.cell.getColumn().component) {
      let factory = this.componentResolver.resolveComponentFactory(
          this.cell.getColumn().component);

      let cpnt = this.vc.createComponent(factory);

      this.innerConponent = cpnt.instance;
      if (!!this.innerConponent.setParaments) {
        this.innerConponent.setParaments(
            this.cell.getColumn().paras, this.cell.getRow().getData(),
            this.columns, this.trIndex, this.viewContainerService);
      } else {
        if (!!console) {
          console.log(
              'the component should have a function named setParaments');
        }
      }
      this.cgRef.markForCheck();
      this.cgRef.detectChanges();
    }
  }
  ngOnDestroy() {
    this.cgRef.detach();
  }
}
