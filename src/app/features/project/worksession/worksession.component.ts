import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Task } from 'src/app/core/core.models';
import { ActiveSessionsService } from '../_services';
import { WorkSessionStore, SprintStore, TaskStore } from '../_stores';
@Component({
  selector: 'tu-worksession',
  templateUrl: './worksession.component.html',
  styleUrls: ['./worksession.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorksessionComponent {
  taskDoneSound = new Audio("./assets/sounds/intuition.mp3");
  timeboxMinutes = 20;

  constructor(
    public activeSessionsService: ActiveSessionsService,
    public taskStore: TaskStore,
    public sprintStore: SprintStore,
    private workSessionStore: WorkSessionStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // const id = this.route.snapshot.params['id'];
    // this.activeSessionsService.getActiveSessions(id);
    this.taskDoneSound.load();
  }
  onSliderChange(event): void {
    this.timeboxMinutes = event.target.value;
  }


  updateTaskStatus(task, { target }) {
    target.classList.toggle('task-status--done');

    this.taskStore
      .updateTaskStatus(task)
      .subscribe(() => this.taskDoneSound.play())
  }

  startWorkSession(task: Task) {
    this.workSessionStore
      .createWorkSession(task, this.timeboxMinutes)
      .subscribe(() => this.router.navigate(['../timer'], { relativeTo: this.route }))
  }

  identify(index, item) {
    if (!item) return null
    return item._id;
  }

}

