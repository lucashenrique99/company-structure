import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menus: Array<Menu>;

  constructor(private auth: AuthService) {

    this.menus = [
      {
        label: 'RTs',
        fontSet: 'fas',
        icon: 'fa-users',
        url: '/rts/pesquisar',
        children: [
          {
            label: 'Estrutura',
            fontSet: 'fas',
            icon: 'fa-sitemap',
            url: '/rts/estrutura'
          }
        ]
      },
      {
        label: 'Squads',
        fontSet: 'fas',
        icon: 'fa-user-friends',
        url: '/squads/pesquisar',
        children: [
          {
            label: 'Estrutura',
            fontSet: 'fas',
            icon: 'fa-sitemap',
            url: '/squads/estrutura'
          }
        ]
      },
      {
        label: 'Funcionários',
        fontSet: 'fas',
        icon: 'fa-user',
        url: '/funcionarios/pesquisar',
      },
    ];
  }

  getMenus(): Observable<Array<Menu>> {
    const menu$ = new BehaviorSubject<Array<Menu>>(this.menus
      .filter(menu => !menu.roles || this.auth.currentUserHasAnyAuthority(menu.roles)));
    return menu$;
  }

}

export interface Menu {

  label: string;
  svgIcon?: string;
  icon?: string;
  fontSet?: string;
  url?: string;
  children?: Array<Menu>;
  roles?: Array<string>;

}