import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'px-breadcrumb',
  templateUrl: 'breadcrumb.html',
  styleUrls: ['../styles/breadcrumb.css']
})

export class PxBreadcrumbComponent {
  @Input() links: any = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  goTo(url: any, relative: boolean, params: any) {
    if (relative) {
      this.router.navigate(
          [url], {relativeTo: this.route, queryParams: params});
    } else {
      this.router.navigate([url], {queryParams: params});
    }
  }
}