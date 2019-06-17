import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/user/auth.service';

/** 
 * JWT INTERCEPTOR
 * Intercepts requests before sending them, and attaches a JWT token as Authorization header.
 */
@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  token: string;
  constructor(private authService: AuthService) {
    this.authService.authState.subscribe((authData) => this.token = authData && authData.accessToken);
  };

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.token) {
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)
      req = req.clone({ headers })
    };

    return next.handle(req);
  }
}
