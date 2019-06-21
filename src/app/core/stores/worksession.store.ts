import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/shared/store/store';
import { ProjectStore } from './project.store';
import { WorksessionService } from '../services/project-flow/worksession.service';
import { WorkSession, Task } from '../core.models';
import { ProjectSocketService } from '../services/project-socket.service';


@Injectable(
  //   {
  //   providedIn: 'root'
  // }
)
export class WorkSessionStore extends Store<WorkSession> {
  timebox: number;
  task: Task;

  constructor(
    private worksessionService: WorksessionService,
    private projectStore: ProjectStore,
    private projectSocket: ProjectSocketService,
  ) {
    super(null);
    this.projectStore.state$.subscribe(project => {
      if (!project) return
      this.worksessionService.setProjectRoute(project._id)
    })
  }

  setWorkSessionConfig(task, minutes) {
    this.timebox = minutes;
    this.task = task;
  }

  // CRUD
  createWorkSession(task: Task, timebox = 0) {
    return this.worksessionService
      .create(task._id)
      .pipe(
        tap((workSession: WorkSession) => {
          this.setWorkSessionConfig(task, timebox);
          this.setState({ ...this.state, ...workSession });

          // Notificate connected team members that session started
          const projectId = this.projectStore.getProjectId();
          this.projectSocket.notifyWorkSession({ ...workSession, projectId });
        })
      )
  }

  stopWorkSession() {
    const session = this.state;
    return this.worksessionService.stopWorkSession(session)
      .pipe(
        tap(() => {
          const nowDate = new Date(Date.now())
          console.log(nowDate);
          this.setState({ ...this.state, endedAt: nowDate })
        })
      )
  }
}
