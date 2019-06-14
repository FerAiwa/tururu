import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'ngx-socket-io';

import { environment } from 'src/environments/environment';
import { WorkSession } from '../core.models';

@Injectable({
  providedIn: 'root'
})
// The update trigger comes from socket notification of the team activity, or ws component iniciation.
export class ActiveSessionsService {
  private activeSessions = new BehaviorSubject<any>(null)
  activeSessions$ = this.activeSessions.asObservable();

  constructor(private http: HttpClient, private socket: Socket) {
    this.socket.on('workSessionStartTeamNotify', (ws: WorkSession) => {
      this.getActiveSessions(ws.projectId);
    })
  }

  get apiRoute() {
    return `${environment.apiBaseUrl}/projects`;
  }

  setActiveSessions(sessions) {
    this.activeSessions.next(sessions);
  }

  getActiveSessions(projectId) {
    const url = `${this.apiRoute}/${projectId}/worksession`;
    return this.http.get(url).subscribe(s => this.setActiveSessions(s))
  }
}
