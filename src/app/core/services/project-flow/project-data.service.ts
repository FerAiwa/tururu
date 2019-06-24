import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Project } from '../../core.models';
import { map } from 'rxjs/operators';
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ProjectService {
  url: string;

  constructor(private http: HttpClient) { };

  get apiRoute() {
    return `${environment.apiBaseUrl}/projects`;
  }

  create(projectData) {
    const apiRoute = `${this.apiRoute}/create`;
    return this.http.post<string>(apiRoute, projectData)
  }

  getProject(id: string) {
    const url = `${this.apiRoute}/${id}`
    return this.http.get(url)
  };

  uploadBanner(projectId: string, image: File) {
    const formData = new FormData();
    formData.append('banner', image);

    return this.http.post(`${this.apiRoute}/${projectId}/banner`, formData, {
      observe: 'response'
    }).pipe(map(res => res.headers.get('location')))
  }
}
