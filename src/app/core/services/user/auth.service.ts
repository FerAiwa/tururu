import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthInfo } from '../../core.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authInfo: AuthInfo;

  constructor(private http: HttpClient, private router: Router) {
    this.authInfo = JSON.parse(localStorage.getItem('auth'));
  }

  login({ email, password }) {
    const url = environment.apiBaseUrl + '/account/login';
    return this.http
      .post(url, { email, password })
      .pipe(
        tap((info: AuthInfo) => {
          console.log(info);
          this.setAuthInfo(info)
        })
      )
  }

  register({ name, email, password }) {
    return this.http.post(`${environment.apiBaseUrl}/account/signup`, {
      name,
      email,
      password
    });
  }

  logout() {
    this.resetAuthInfo();
  }

  private setAuthInfo(authInfo: AuthInfo) {
    this.authInfo = authInfo;
    localStorage.setItem('auth', JSON.stringify(authInfo));
  }

  private resetAuthInfo() {
    localStorage.removeItem('auth');
    this.authInfo = null;
    this.router.navigate(['/welcome']);

  }
}
