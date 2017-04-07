import {Component, ElementRef, HostListener, Input} from '@angular/core';

@Component({
  selector: 'px-backtop',
  templateUrl: 'backtop.html',
  styleUrls: ['../styles/backtop.css']
})

export class PxBacktopComponent {
  @Input('scrollspeed') speed: any;
  class: string;
  theme: string = 'backtop';

  constructor(private el: ElementRef) {
    this.el = el;
    var self = this;
    window.addEventListener('scroll', function() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        self.class = 'backtop-show';
      } else {
        self.class = '';
      }
    });
  }

  @HostListener('click', ['$event.target'])
  onClick(btn: any) {
    this.smoothScroll();
    this.class = '';
  }

  currentYPosition() {
    if (self.pageYOffset) {
      return self.pageYOffset;
    }
    if (document.documentElement && document.documentElement.scrollTop) {
      return document.documentElement.scrollTop;
    }
    if (document.body.scrollTop) {
      return document.body.scrollTop;
    }
    return 0;
  };

  smoothScroll() {
    var startY = this.currentYPosition();
    var stopY = 0;
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    var speed = this.speed ? Math.round(this.speed / 100) : 6;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY += step;
        if (leapY > stopY) {
          leapY = stopY;
        }
        timer++;
      }
      return;
    }
    for (var j = startY; j > stopY; j -= step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY -= step;
      if (leapY < stopY) {
        leapY = stopY;
      }
      timer++;
    }
  };
}