import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: Array<BreadcrumbItem> = [];
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.buildBreadcrumb();

    this.router
      .events
      .pipe(
        tap(e => {
          if (e instanceof NavigationStart) {
            this.isLoading = true;
          } else if (
            e instanceof NavigationEnd ||
            e instanceof NavigationCancel ||
            e instanceof NavigationError
          ) {
            this.isLoading = false;
          }
        }),
        filter(e => e instanceof NavigationEnd))
      .subscribe(e => this.buildBreadcrumb())
  }

  private buildBreadcrumb() {
    this.breadcrumbs = [];

    let currentRoute: ActivatedRoute | null = this.activatedRoute.root,
      url = '';

    do {
      const childrenRoutes = currentRoute.children;
      currentRoute = null;
      childrenRoutes.forEach(route => {
        if (route.outlet === 'primary') {
          const routeSnapshot = route.snapshot;
          url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');

          if (route.snapshot.data.hasOwnProperty('breadcrumb')) {
            this.breadcrumbs.push({
              label: route.snapshot.data.breadcrumb,
              url: url
            });
          }
          currentRoute = route;
        }
      });
    } while (currentRoute);
  }

}

export interface BreadcrumbItem {
  label: string;
  url?: string;
}