import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Project } from '../../core.models';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  url: string;

  constructor(private http: HttpClient) { };

  get apiRoute() {
    return `${environment.apiBaseUrl}/projects`;
  }



  create(projectData) {
    const apiRoute = `${this.apiRoute}/create`;
    return this.http.post<Project>(apiRoute, projectData)
  }

  getProject(id: string) {
    const url = `${this.apiRoute}/${id}`
    return this.http.get(url)
  };
}
