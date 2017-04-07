
import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({selector: '[pxTooltip]'})

export class PxTooltipDirective {
  constructor(private elementRef: ElementRef) {}

  pxTooltip: any;
  elemPosition: any;
  tooltipOffset: number = 8;

  @Input('pxTooltip') tooltipText = '';
  @Input() placement = 'top';
  @Input() delay = 0;
  @Input() tooltipType = 'iconType';

  @HostListener('mouseenter')
  onMouseEnter() {
    this.getElemPosition();
    if (this.tooltipType == 'textType') {
      document.body.appendChild(this.createHelpElem());
    } else {
      document.body.appendChild(this.createElem());
    }
    this.setPosition();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.pxTooltip.remove();
  }

  getElemPosition() {
    this.elemPosition = this.elementRef.nativeElement.getBoundingClientRect();
  }

  createElem() {
    this.pxTooltip = document.createElement('span');
    this.pxTooltip.className += 'px-tooltip px-tooltip-' + this.placement;
    this.pxTooltip.textContent = this.tooltipText;
    setTimeout(() => {
      this.pxTooltip.className += ' px-tooltip-show';
    }, this.delay);

    return this.pxTooltip;
  }

  createHelpElem() {
    this.pxTooltip = document.createElement('span');
    this.pxTooltip.className += 'px-tooltip-help tip-' + this.placement;
    this.pxTooltip.textContent = this.tooltipText;
    setTimeout(() => {
      this.pxTooltip.className += ' help-tooltip-show';
    }, this.delay);

    return this.pxTooltip;
  }

  setPosition() {
    let elemHeight = this.elementRef.nativeElement.offsetHeight;
    let elemWidth = this.elementRef.nativeElement.offsetWidth;
    let tooltipHeight = this.pxTooltip.clientHeight;
    let tooltipWidth = this.pxTooltip.offsetWidth;

    if (this.placement == 'top') {
      this.pxTooltip.style.top = this.elemPosition.top -
          (tooltipHeight + this.tooltipOffset - window.scrollY) + 'px';
    }

    if (this.placement == 'bottom') {
      this.pxTooltip.style.top = this.elemPosition.top + elemHeight +
          this.tooltipOffset + window.scrollY + 'px';
    }

    if (this.placement == 'top' || this.placement == 'bottom') {
      this.pxTooltip.style.left =
          (this.elemPosition.left + elemWidth / 2) - tooltipWidth / 2 + 'px';
    }

    if (this.placement == 'left') {
      this.pxTooltip.style.left =
          this.elemPosition.left - tooltipWidth - this.tooltipOffset + 'px';
    }

    if (this.placement == 'right') {
      this.pxTooltip.style.left =
          this.elemPosition.left + elemWidth + this.tooltipOffset + 'px';
    }

    if (this.placement == 'left' || this.placement == 'right') {
      this.pxTooltip.style.top = this.elemPosition.top + window.scrollY +
          elemHeight / 2 - this.pxTooltip.clientHeight / 2 + 'px';
    }
  }
}