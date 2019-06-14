import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

/** 
 * JWT INTERCEPTOR
 * Intercepts requests before sending them, and attaches a JWT token as Authorization header.
 */
@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { };

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (this.authService && this.authService.authInfo) {
      const { accessToken } = this.authService.authInfo;
      const headers = new HttpHeaders().set("Authorization", `Bearer ${accessToken}`)
      req = req.clone({ headers })
    };

    return next.handle(req);
  }
}
