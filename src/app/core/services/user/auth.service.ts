import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthInfo } from '../../core.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject: BehaviorSubject<AuthInfo>;
  authState: Observable<AuthInfo>;

  authInfo: AuthInfo;

  constructor(private http: HttpClient, private router: Router) {
    const initialState = this.getStoredAuth();
    this.authSubject = new BehaviorSubject(initialState);
    this.authState = this.authSubject.asObservable();
  }

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
