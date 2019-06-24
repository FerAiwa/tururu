import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserSocketService } from '../user-socket.service';
import { ProjectSocketService } from '../project-socket.service';
import { ProjectInvitation } from '../../core.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  invitation = new BehaviorSubject(null);
  invitation$ = this.invitation.asObservable();

  constructor(private userSocket: UserSocketService, private projectSocket: ProjectSocketService) { }

  onNotification(): Observable<any> {
    return new Observable(observer => {
      this.userSocket.socket.on('notification', (invitation: ProjectInvitation) => observer.next(invitation));
    })
  }
}
