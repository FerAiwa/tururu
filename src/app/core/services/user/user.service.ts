import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { User, ProjectBrieffing } from '../../core.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private projects = new BehaviorSubject<ProjectBrieffing[]>(null);
  projects$ = this.projects.asObservable();
  userInfo;

  constructor(private http: HttpClient) {
    console.log('init userService');
  }

  private get apiRoute() {
    return `${environment.apiBaseUrl}/user`;
  }

  uploadAvatar(image: File) {
    const formData = new FormData();
    formData.append('avatar', image);

    return this.http.post(`${environment.apiBaseUrl}/user/avatar`, formData, {
      observe: 'response'
    }).pipe(map((res) => res.headers.get('location')))
  }

  // The user uuid is attached in the headers by the JWT interceptor.
  getUserInfo() {
    return this.http
      .get<User>(this.apiRoute)
      .pipe(
        tap((userInfo) => {
          this.userInfo = userInfo;
          this.projects.next(userInfo.projects)
        }),
      )
  }
}
