import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ProjectSocketService } from '../../../core/services/project-socket.service';

@Injectable()
// The update trigger comes from socket notification of the team activity, or ws component iniciation.
export class ActiveSessionsService {
  private activeSessions = new BehaviorSubject<any>(null)
  activeSessions$ = this.activeSessions.asObservable();

  get apiRoute() {
    return `${environment.apiBaseUrl}/projects`;
  }

  constructor(private http: HttpClient, private projectSocket: ProjectSocketService) {
    this.projectSocket
      .onWorksessionStartNotification()
      .subscribe((ws) => this.getActiveSessions(ws.projectId)
      );
  }


  setActiveSessions(sessions) {
    this.activeSessions.next(sessions);
  }

  getActiveSessions(projectId) {
    const url = `${this.apiRoute}/${projectId}/worksession`;
    return this.http.get(url).subscribe(s => this.setActiveSessions(s))
  }
}
