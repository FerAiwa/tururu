import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { socketConfig } from 'src/app/app-sockets-config';

import { AuthService } from './user/auth.service';
import { AuthInfo } from '../core.models';

@Injectable({
  providedIn: 'root'
})
/**
 * Control the socket to force a singleton across the app.
 * socket server will require Authorization header, that is not always ready on app init.
 * Dependencies: Auth Service.
 */
export class UserSocketService {
  socket: Socket;

  constructor(private authService: AuthService) {
    this.initSocketOnAuth();
  }

  onNotification(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('notification', (invitation) => observer.next(invitation));
    })
  }

  onDisconnect() {
    this.socket.on('disconnect', () => console.log('disconnected socket from UserSocketService!'))
  }

  onConnect(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('connect', (x) => observer.next('CONNECTED OBSERVER!'));
    })
  }


  /** Updates authorization header with new token */
  private getAuthSocketOptions(token) {
    const { options } = socketConfig;
    options.transportOptions.polling.extraHeaders.authorization = `Bearer ${token}`

    return { ...socketConfig, options }
  }

  private initSocketOnAuth() {
    this.authService.authState
      .subscribe(
        (auth: AuthInfo) => {
          if (!auth && this.socket) return this.socket.disconnect();
          if (!auth) return;
          const { accessToken } = auth;

          this.socket = new Socket(this.getAuthSocketOptions(accessToken));

          this.socket.on('notifyNewTeamMember', (data) => console.log(data))
        })
  };



}
