import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
  CanActivateChild
} from '@angular/router';

import { AuthService } from '../services/user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  token: string;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authState.subscribe((authData) => this.token = authData && authData.accessToken);
  }

  canActivate(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot) {
    if (!this.token) {
      console.log('auth guard -> fail');
      this.router.navigate(['/welcome']);
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
