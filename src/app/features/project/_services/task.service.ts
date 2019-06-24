import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Task } from '../../../core/core.models';

@Injectable()
export class TaskService {
  apiRoute = `${environment.apiBaseUrl}`;
  private projectRoute: string;

  setProjectRoute(projectId) {
    this.projectRoute = `${this.apiRoute}/projects/${projectId}/tasks`;
  }

  constructor(private http: HttpClient) { }


  createTasks(tasks: Task[]) {
    return this.http.post<Task[]>(this.projectRoute, { tasks })
  }

  getTasks() {
    return this.http.get<Task[]>(this.projectRoute)
  }

  /** @param status done | undone */
  updateTaskStatus(taskId: string, status: string) {
    const params = {
      task: taskId,
      status
    };
    return this.http.patch(this.projectRoute, {}, { params });
  }

}
