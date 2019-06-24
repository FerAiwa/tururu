import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UserInfo } from '../../../core/core.models';

@Injectable()
export class TeamService {
  private apiRoute = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getTeamInfo(projectId: string) {
    const url = `${this.apiRoute}/projects/${projectId}/users`;
    return this.http.get<UserInfo[]>(url)
  }

}
