import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface ProjectInvitation {
  project: String,
  author: String,
  sendTo: String,
  createdAt: Date,
  confirmedAt: Date,
  rejectedAt: Date,
}

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpClient, private router: Router) { }

  sendProjectInvitation(projectId: string, targetUser: string) {
    const URL = `${environment.apiBaseUrl}/projects/${projectId}/users`;

    return this.http.post(URL, { targetUser, }).subscribe(
      x => console.log('success sent')
    );
  }


  answerProjectInvitation(projectId: string, isAccepted: boolean) {
    const answer = isAccepted ? 'accept' : 'decline';
    const URL = `${environment.apiBaseUrl}/user/invitation`;
    const params = { projectId, answer };

    return this.http.get(URL, { params })
  }

}
