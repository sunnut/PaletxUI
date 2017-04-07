import {Component} from '@angular/core';
// import {Router} from '@angular/router';

@Component({
  selector: 'demo-components-nav',
  moduleId: module.id,
  templateUrl: 'nav.html',
  styleUrls: ['nav.css']
})

export class PxComponentsNavComponent {
}

// export class PxComponentsNavComponent implements DoCheck {
//  constructor(private router: Router) {}

// showSelectorMenu: boolean = true;
// isSelectorMenuActive: boolean;
//
// setSelectorMenuShow() {
//  this.showSelectorMenu = !this.showSelectorMenu;
//}
//
// ngDoCheck() {
//  this.isSelectorMenuActive =
//      this.router.url.startsWith('/components/radio') ||
//      this.router.url.startsWith('/components/checkbox') ||
//      this.router.url.startsWith('/components/select');
//}
//}
