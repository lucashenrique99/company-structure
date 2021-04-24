import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, switchMap, retry, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {

        if (this.isWhiteList(req.url)
            && !this.isBlackList(req.url)
            && this.authService.getToken()) {

            return next.handle(this.updateHeader(req))
                .pipe(
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 401 && err.error.error === 'invalid_token') {
                            return this.authService.handleRefreshToken()
                                .pipe(
                                    retry(2),
                                    mergeMap((res: { auth: boolean }) => {
                                        if (res.auth) {
                                            return of(res);
                                        } else {
                                            this.authService.handleLogout();
                                            this.router.navigate(['/sign-in']);
                                            return EMPTY;
                                        }
                                    }),
                                    switchMap(() => next.handle(this.updateHeader(req)))
                                );
                        }
                        return throwError(err);
                    })
                );

        } else if (this.isWhiteList(req.url)
            && this.isBlackList(req.url)
            && this.authService.getToken()) {
            return next.handle(req)
                .pipe(
                    catchError((err: HttpErrorResponse) => {
                        if (err.status === 401 && err.error.error === 'unauthorized') {
                            this.authService.handleLogout();
                            this.router.navigate(['/sign-in']);
                            return EMPTY;
                        }
                        return throwError(err);
                    })
                );

        } else {
            return next.handle(req);
        }
    }

    private isBlackList(url: string) {
        return url.includes(`${environment.apiUrl}/oauth/token`);
    }

    private isWhiteList(url: string) {
        return url.includes(environment.apiUrl);
    }

    private updateHeader(req: HttpRequest<any>) {
        return req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
        });
    }
}