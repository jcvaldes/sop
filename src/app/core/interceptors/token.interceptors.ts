import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { tap, catchError } from 'rxjs/operators';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private router: Router,
    private ssService: SessionStorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    const token = auth.user && auth.token ? auth.token : '';
    if(this.router.url.endsWith('login') || this.router.url.endsWith('renewtoken')) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        // 'Api-Token': token,
        // TODO: Replace following line with an actual Base64 | JWT-based token
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.Response && event.headers.get('Authorization')) {
            const token = event.headers.get('authorization');
            this.ssService.set('token', token);
          } else {
            // console.log("Token no retornado");
          }
        }, (error: HttpErrorResponse) => {
          this.ssService.clear();
          this.router.navigate(['/login']);
        }
      )
    );
  }
}
