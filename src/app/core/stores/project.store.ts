import { Store } from '../../shared/store/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/user/auth.service';
import { ProjectService } from '../services/project-flow/project-data.service';
import { ProjectSocketService } from '../services/project-socket.service';
import { UserSocketService } from '../services/user-socket.service';
import { Project } from '../core.models';

@Injectable({
    providedIn: 'root'
})
export class ProjectStore extends Store<Project> {

    constructor(
        private projectService: ProjectService,
        private authService: AuthService,
        private projectSocketService: ProjectSocketService,
        //private userSocket: UserSocketService,
    ) {
        super(null)
        console.log('initialized project store');
    };

    /**
     * Saves the id of the last project accessed by the user, for short access on app-reload.
     */
    private storeLastAccessedProject(id: string) {
        const { uuid } = this.authService.getStoredAuth();
        const accessData = JSON.stringify({ uuid, id });

        return localStorage.setItem('lastProjectView', accessData);
    }

    getProject(id) {
        return this.projectService.getProject(id)
            .pipe(
                tap((project: Project) => {
                    console.log('project store: updated state', project)
                    this.setState({ ...this.state, ...project });
                    this.storeLastAccessedProject(id);
                    this.projectSocketService.joinProjectRoom(project._id);
                }))
    }

    createProject(project) {
        return this.projectService
            .create(project)
            .pipe(
                tap(() => this.setState({ ...this.state, ...project }))
            )
    }

    getActiveProject() {
        return this.state;
    }

    getProjectId() {
        return this.state._id
    }

    uploadBanner(file: File) {
        const projectId = this.state._id;
        return this.projectService
            .uploadBanner(projectId, file)
            .pipe(tap(location => this.setState({ ...this.state, bannerUrl: location })))
    }
}
