import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { WorkSession } from '../../../core/core.models';

@Injectable()
export class WorksessionService {
  apiRoute = `${environment.apiBaseUrl}`;
  private projectRoute: string;

  setProjectRoute(projectId) {
    this.projectRoute = `${this.apiRoute}/projects/${projectId}/worksession`;
  }

  constructor(private http: HttpClient) { }

  create(taskId: string) {
    return this.http.post<WorkSession>(this.projectRoute, { taskId })
  }

  stopWorkSession(workSession: WorkSession) {
    return this.http.patch(this.projectRoute, { workSession })
  }

}
