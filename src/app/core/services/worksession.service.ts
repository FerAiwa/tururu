import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { WorkSession } from '../core.models';

@Injectable({
  providedIn: 'root'
})
export class WorksessionService {

  apiRoute = `${environment.apiBaseUrl}`;
  private projectRoute: string;

  constructor(private http: HttpClient) { }


  setProjectRoute(projectId) {
    this.projectRoute = `${this.apiRoute}/projects/${projectId}/worksession`;
  }

  create(taskId: string) {
    return this.http.post<WorkSession>(this.projectRoute, { taskId })
  }

  stopWorkSession(workSession: WorkSession) {
    return this.http.patch(this.projectRoute, { workSession })
  }
  // getWorkSessions() {
  //   const projectId = this.route.snapshot.params['id'];
  //   if (!projectId) return

  //   return this.http.get(this.url).pipe(
  //     tap(res => {
  //       this.projectId = projectId;
  //       //state
  //     })
  //   )
  //   //Returns ALL the worksessions and updateStore state.
  //   //Get SprintTasks
  // }

  // getActiveWorkSession() {
  //   return this.state.find(ws: WorkSession => ws.uuid === 'user' && !ws.dateEnd)
  // }

}
