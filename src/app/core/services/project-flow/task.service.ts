import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Task } from '../../core.models';

@Injectable(
  //   {
  //   providedIn: 'root'
  // }
)
export class TaskService {

  apiRoute = `${environment.apiBaseUrl}`;
  private projectRoute: string;

  constructor(private http: HttpClient) { }

  setProjectRoute(projectId) {
    this.projectRoute = `${this.apiRoute}/projects/${projectId}/tasks`;
  }

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
