import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

import { Store } from 'src/app/shared/store/store';
import { TeamService } from '../services/project-flow/team.service';
import { UserInfo } from '../core.models';

@Injectable({
  providedIn: 'root'
})
export class TeamStore extends Store<UserInfo[]> {

  constructor(
    private teamService: TeamService,
    private socket: Socket,
  ) {
    super(null)
    // this.socket.on('workSessionStartTeamNotify')
  }

  getTeamInfo(projectId: string) {
    return this.teamService
      .getTeamInfo(projectId)
      .pipe(tap((users) => {
        if (this.state) this.setState([...this.state, ...users]);
        else this.setState([...users]);
      }))
  }

  getTeamMemberInfo(uuid: string) {
    return this.state.find((user) => user.uuid === uuid);
  }
}
