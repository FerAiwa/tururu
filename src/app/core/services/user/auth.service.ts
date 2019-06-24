import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthInfo } from '../../core.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  initialState = this.getStoredAuth();

  private authSubject = new BehaviorSubject<AuthInfo>(this.initialState);

  authState = this.authSubject.asObservable();

  authInfo: AuthInfo;

  constructor(private http: HttpClient, private router: Router) { }

  login({ email, password }) {
    const url = environment.apiBaseUrl + '/account/login';
    return this.http
      .post(url, { email, password })
      .pipe(
        tap((info: AuthInfo) => {
          this.authSubject.next(info)
          localStorage.setItem('auth', JSON.stringify(info));
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
    this.authSubject.next(null)
    localStorage.removeItem('auth');
    this.router.navigate(['/welcome']);
  }

  getStoredAuth() {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth && JSON.parse(storedAuth) || null;
  }

}
