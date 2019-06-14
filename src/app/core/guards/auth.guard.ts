import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivate,
  CanActivateChild
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot) {
    if (this.authService && this.authService.authInfo) {
      const { accessToken } = this.authService.authInfo;

      if (accessToken) return true;
    }

    this.router.navigate(['/welcome']);
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}

//route: ActivatedRouteSnapshot, snapshot: RouterStateSnapshot
