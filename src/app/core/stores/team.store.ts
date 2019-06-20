import { Injectable } from '@angular/core';
import { tap, map, filter } from 'rxjs/operators';

import { Store } from 'src/app/shared/store/store';
import { TeamService } from '../services/project-flow/team.service';
import { ProjectSocketService } from '../services/project-socket.service';
import { ProjectStore } from './project.store';
import { UserInfo, Project } from '../core.models';

@Injectable(
  //   {
  //   providedIn: 'root'
  // }
)
export class TeamStore extends Store<UserInfo[]> {

  constructor(
    private teamService: TeamService,
    private projectSocketService: ProjectSocketService,
    private projectStore: ProjectStore,
  ) {
    super(null)
    //Auto updates
    this.updateOnProjectLoad();
    // this.listenSocketLivePatches();
  }

  private updateOnProjectLoad() {
    this.projectStore.state$
      .pipe(
        filter((project: Project) => project !== null),
        map(({ _id }) => _id)
      ).subscribe(
        _id => this.getTeamInfo(_id).subscribe()
      );
  }

  /** Recovers users public data, with their role in the project */
  public getTeamInfo(projectId: string) {
    return this.teamService
      .getTeamInfo(projectId)
      .pipe(tap((users) => this.setState(users)))
  }

  public getTeamMemberInfo(uuid: string) {
    return this.state.find((user) => user.uuid === uuid);
  }

  /** Socket live-patch
   * 
   * When a new member joins the team and the user is connected in the project room.
   * Avoids recalling API to recover full team info by just adding to the 
   * current state the new part received vía socket.
   */
  private listenSocketLivePatches() {
    //If socket is ready

    this.projectSocketService
      .onNotifyNewTeamMember()
      .pipe(map(notification => notification.user))
      .subscribe(user => {
        console.log('team store catched update');
        this.livePatchNewTeamMember(user)
      })
  }

  private livePatchNewTeamMember(user: UserInfo) {
    console.log(this.state);
    console.log('live patch!', user);
    this.setState([...this.state, user]);
    console.log(this.state);
  }
}
