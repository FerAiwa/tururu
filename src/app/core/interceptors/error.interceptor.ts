import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../services/app-notification/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastService: ToastService,
    private router: Router,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status == 404) {
          //deleted project?
          localStorage.removeItem('lastProjectView');
          this.router.navigate(['/user-projects']);
        }
        if (error.status === 401 && error.code === 'NOAUTH') {
          // Navigate with no toast notification
          localStorage.removeItem('auth');
          this.router.navigate(['/welcome']);
        }
        if (error.context && error.message) {
          console.log(error); // redirect to login if its authentication expired
          this.toastService.addToast(error);
        }

        return throwError(error.error);
      })
    );
  }
}
