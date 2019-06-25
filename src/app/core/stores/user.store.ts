import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, take, skip } from 'rxjs/operators';

import { Store } from 'src/app/shared/store/store';
import { ProjectStore } from './project.store';
import { UserService } from '../services/user/user.service';
import { InvitationService } from '../services/user/invitation.service';
import { User } from '../core.models';

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

  updateProjectListBanner() {
    const { _id, name, bannerUrl } = this.projectStore.state;
    const projects = this.state.projects
      .map(info => {
        if (info._id !== _id) return info;
        return { ...info, bannerUrl }
      });
    this.setState({ ...this.state, projects })
  }

  /** Live update user project list, after project creation or accepting a invitation. */
  liveUpdateProjectList(_id: string, name: string) {
    const projects = [...this.state.projects, { _id, name }];
    this.setState({ ...this.state, projects })
  }


  // Adds project name and id to the list, after project ends loading from API.
  updateProjectListAfterLoad() {
    return this.projectStore.state$
      .pipe(
        skip(1),
        take(1),
        tap(({ name, _id, bannerUrl }) => this.liveUpdateProjectList(_id, name))
      )
  }

}
