import { Store } from '../../shared/store/store';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';

import { ProjectService } from '../services/project-data.service';
import { Project } from '../core.models';
import { AuthService } from '../services/auth.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ProjectStore extends Store<Project> {

  constructor(private projectService: ProjectService, private authService: AuthService, private socket: Socket) {
    super(null)
    console.info('project-store initialized');
    this.socket.on('notifyWorkSession', ws => console.log(ws))
  };

  /**
   * Saves the id of the last project accessed by the user, for short access on app-reload.
   */
  private storeLastAccessedProject(id: string) {
    const { uuid } = this.authService.authInfo;
    const accessData = JSON.stringify({ uuid, id });

    return localStorage.setItem('lastProjectView', accessData);
  }

  getProject(id) {
    return this.projectService
      .getProject(id)
      .pipe(tap((project: Project) => {
        console.log('project store: updated state', project)
        this.setState({ ...this.state, ...project });
        this.storeLastAccessedProject(id);
        this.socket.emit('joinProjectRoom', {
          uuid: this.authService.authInfo.uuid,
          projectId: project._id,
        })
      }))
  }

  createProject(project) {
    return this.projectService
      .create(project)
      .pipe(
        tap((project: Project) => this.setState({ ...this.state, ...project }))
      )
  }

  getProjectId() {
    return this.state._id
  }




}
