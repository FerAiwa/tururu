import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { tap } from 'rxjs/operators';

import { User, ProjectBrieffing } from '../../core.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private projects = new BehaviorSubject<ProjectBrieffing[]>(null);
  projects$ = this.projects.asObservable();

  userInfo;

  constructor(private http: HttpClient, private socket: Socket) {
    console.log('init userService');
    this.socket.on('connect', () => {
      console.log('connectado al server');
    })
  }

  private get apiRoute() {
    return `${environment.apiBaseUrl}/user`;
  }

  uploadAvatar(image: File) {
    const formData = new FormData();
    formData.append('avatar', image);

    return this.http.post(`${environment.apiBaseUrl}/user/avatar`, formData, {
      observe: 'response'
    });
  }


  addProject() {

  }

  getAvatar() { }

  getUserInfo() {
    return this.http
      .get<User>(this.apiRoute)
      .pipe(
        tap((userInfo) => {
          this.userInfo = userInfo;
          this.projects.next(userInfo.projects)
          // this.socket.emit('connectProject', { name: 'Fer' });
          // this.socket.on('connectionNotification', (a) => console.log(a));
        }),
      )
  }
}
