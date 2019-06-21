import { Injectable } from '@angular/core';
import { UserSocketService } from './user-socket.service';
import { Observable } from 'rxjs';

@Injectable(
  {
    providedIn: 'root',
  }
)

export class ProjectSocketService {

  constructor(private userSocketService: UserSocketService) {
    console.log('initialized projectsocket service ');
  }

  joinProjectRoom(projectId: string) {
    this.userSocketService.socket.emit('joinProjectRoom', projectId);
  }

  notifyWorkSession(ws) {
    this.userSocketService.socket.emit('workSessionStarted', ws);
  }

  onTeamNotification() { }

  onNotifyNewTeamMember(): Observable<any> {
    return new Observable(observer => {
      this.userSocketService.socket.on('notifyNewTeamMember', (data) => observer.next(data));
    })
  }

  onWorksessionStartNotification(): Observable<any> {
    return new Observable(observer => {
      this.userSocketService.socket.on('workSessionStartTeamNotify', (data) => observer.next(data));
    })
  }

  onWorkSessionEnd() { }


}

