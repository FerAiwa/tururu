import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Sprint } from '../../core.models';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  apiRoute = `${environment.apiBaseUrl}`;
  private projectRoute: string;

  constructor(private http: HttpClient) { }

  setProjectRoute(projectId) {
    this.projectRoute = `${this.apiRoute}/projects/${projectId}/sprint`;
  }

  create(sprint: Sprint) {
    return this.http.post(this.projectRoute, sprint)
  }

  getSprint(id) {
    return this.http.get<Sprint>(`${this.projectRoute}?sprintId=${id}`)
  }

  /** Makes a PATCH request and updates the sprint subject on success */
  update(sprint: Sprint) {
    return this.http.patch(`${this.projectRoute}?sprintId=${sprint._id}}`, sprint)
  }

}
