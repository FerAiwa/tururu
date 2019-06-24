import { Injectable } from '@angular/core';
import { tap, take, skip, map } from 'rxjs/operators';
import { interval } from 'rxjs';

import { Store } from 'src/app/shared/store/store';
import { UserService } from '../services/user/user.service';
import { User } from '../core.models';
import { InvitationService } from '../services/user/invitation.service';
import { Router } from '@angular/router';
import { ProjectStore } from './project.store';

/**
 * User store holds the state of the logged user.
 * - Is the source for the header project links and provides direct access to user public data.
 */
@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserStore extends Store<User> {

  constructor(
    private userService: UserService,
    private invitationService: InvitationService,
    private projectStore: ProjectStore,
    private router: Router,
  ) {
    super(null);
    console.log('init user store');
  };

  getUserInfo() {
    return this.userService
      .getUserInfo()
      .pipe(tap((user) => this.setState({ ...this.state, ...user })))
  }

  updateAvatar(image: File) {
    this.userService.uploadAvatar(image)
      .subscribe((location: string) => this.setState({ ...this.state, avatarUrl: location }))
  };

  getAvatar() {
    return this.state.avatarUrl;
  }

  getUser() {
    return this.state;
  }

  getPendingInvitations() {
    return this.state.invitations
      .filter(x => x !== null)
      .filter(inv => !null && !inv.confirmedAt && !inv.rejectedAt)
  }

  answerProjectInvitation(projectId: string, isAccepted: boolean) {
    this.invitationService
      .answerProjectInvitation(projectId, isAccepted)
      .subscribe(
        () => {
          if (isAccepted) {
            // After accepting invitation, navigate to the project and update project list.
            this.router.navigate(["/project", projectId])
              .then(() => this.updateProjectListAfterLoad().subscribe())
          }
        })
  }

  /** Live update user project list, after project creation or accepting a invitation. */
  liveUpdateProjectList(_id: string, name: string) {
    const projects = [...this.state.projects, { _id, name }];
    this.setState({ ...this.state, projects })
  }


  // Adds project name and id to the list, after project ends loading from API.
  private updateProjectListAfterLoad() {
    return this.projectStore.state$
      .pipe(
        skip(1),
        take(1),
        tap(({ name, _id }) => this.liveUpdateProjectList(_id, name))
      )
  }

}
