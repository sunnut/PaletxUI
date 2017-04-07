import {Component, DoCheck} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'demo-app',
  templateUrl: 'demo-app.html',
  styleUrls: ['demo-app.css']
})

export class DemoAppComponent implements DoCheck {
  constructor(private router: Router) {}

  isComponentsRouterActive: boolean;
  isStyleRouterActive: boolean;
  isPatternRouterActive: boolean;

  ngDoCheck() {
    this.isComponentsRouterActive = this.router.url.startsWith('/components');
    this.isStyleRouterActive = this.router.url.startsWith('/style');
    this.isPatternRouterActive = this.router.url.startsWith('/pattern');
  }
}
