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
        console.log('error interceptor!', error);
        if (error.status == 404) {
          //deleted project?
          localStorage.removeItem('lastProjectView');
          this.router.navigate(['/user-projects']);
        }
        if (error.error) {
          const { code, context, message } = error.error;
          console.error(message);
          if (error.status === 401 && code === 'NOAUTH') {
            console.log('ERROR INTERCEPTOR -> NO AUTH!!');
            // Navigate with no toast notification
            localStorage.removeItem('auth');
            this.router.navigate(['/welcome']);
          }
          else if (code == 'NOTUSER') { //403
            this.router.navigate(['/user-projects']);
          }

          if (context && message) {
            console.log(error); // redirect to login if its authentication expired
            this.toastService.addToast(error.error);
          }
        }
        else {
          return throwError(error.error);
        }
      })
    );
  }
}
