import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject, EMPTY } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiClientKey: string;
  private apiUrl: string;
  private authenticated: BehaviorSubject<boolean>;
  private readonly TOKEN = 'app_token_CJ2wKgjakrMUFbQu98sd';

  constructor(
    private http: HttpClient
  ) {
    this.authenticated = new BehaviorSubject(this.checkAuthenticated());
    this.apiClientKey = environment.apiClientKey;
    this.apiUrl = environment.apiUrl;
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated;
  }

  currentUserHasAuthority(role: string): boolean {
    if (this.checkAuthenticated()) {
      const authorities = this.getTokenPayload()?.authorities;
      return authorities?.includes(role) || false;
    }
    return false;
  }

  currentUserHasAnyAuthority(roles: Array<string>): boolean {
    for (let i = 0; i < roles.length; i++) {
      if (this.currentUserHasAuthority(roles[i])) {
        return true;
      }
    }
    return false;
  }

  handleLogin(username: string, password: string): Observable<{ auth: boolean }> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/oauth/token`,
      new HttpParams()
        .append('username', username)
        .append('password', password)
        .append('grant_type', 'password'),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${this.apiClientKey}`
        },
        withCredentials: true
      })
      .pipe(
        map(value => this.handleOnNewToken(value)),
        catchError(error => {
          return of({ auth: false });
        })
      )
  }

  handleRefreshToken() {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/oauth/token`,
      new HttpParams()
        .append('grant_type', 'refresh_token'),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${this.apiClientKey}`
        },
        withCredentials: true
      })
      .pipe(
        map(value => this.handleOnNewToken(value)),
        catchError(error => {
          return of({ auth: false });
        })
      )
  }

  checkUserDetails() {
    return this.http.get<{ name: string }>(`${this.apiUrl}/auth/me`);
  }

  handleLogout() {
    this.removeToken();
    this.authenticated.next(this.checkAuthenticated());
  }

  getToken() {
    const key = btoa(this.TOKEN);
    return localStorage.getItem(key);
  }

  getTokenPayload(): TokenPayload | null {
    const token = this.getToken();
    try {
      return token ? jwtDecode(token) : null;
    } catch (e) {
      return null;
    }
  }

  isTokenExpired() {
    const token = this.getTokenPayload();
    return !token || moment.unix(token.exp).isAfter(moment().add(1, 'd'));
  }

  private saveToken(token: string) {
    const key = btoa(this.TOKEN);
    localStorage.setItem(key, token);
  }

  private removeToken() {
    this.http.delete(`${this.apiUrl}/tokens/revoke`).pipe(catchError(e => EMPTY)).subscribe();
    const key = btoa(this.TOKEN);
    localStorage.removeItem(key);
  }

  private checkAuthenticated() {
    return this.getToken() !== null &&
      this.getToken() !== undefined &&
      !this.isTokenExpired();
  }

  private handleOnNewToken(value: { access_token: string }): { auth: boolean } {
    this.saveToken(value.access_token);
    const auth = this.checkAuthenticated();

    if (auth) {
      this.authenticated.next(true);
    } else {
      this.removeToken();
    }

    return { auth };
  }

}

export interface TokenPayload {
  user?: {
    id: number
  },
  exp: number;
  authorities: Array<String>;
}