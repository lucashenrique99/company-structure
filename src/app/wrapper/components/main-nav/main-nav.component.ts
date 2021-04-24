import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap, filter, debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { environment } from 'src/environments/environment';
import { Menu, MenuService } from 'src/app/shared/services/menu/menu.service';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menus: Array<Menu> = [];

  currentUser: string = 'Guest';
  versionApp: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private menuService: MenuService,
    private auth: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService) {
  }


  ngOnInit() {

    this.auth.isAuthenticated()
      .pipe(
        debounceTime(200),
        filter(isAuthenticated => isAuthenticated))
      .subscribe(() => {

        this.versionApp = environment.version;
        this.getCurrentUser();
        this.updateMenuList();

      });

  }

  updateMenuList() {
    this.menuService
      .getMenus()
      .subscribe(menus => this.menus = menus);
  }

  getCurrentUser() {
    this.auth.checkUserDetails()
      .subscribe(
        (user: { name: string }) => {
          this.currentUser = user.name;
        },
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  logoutHandler(drawer: MatDrawer) {
    this.auth.handleLogout();
    this.router.navigate(['/sign-in']);
    drawer.close();
  }

}

