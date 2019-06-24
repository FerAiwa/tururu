import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ToastService } from 'src/app/core/services/app-notification/toast.service';
import { Store } from 'src/app/shared/store/store';
import { Task } from 'src/app/core/core.models';
import { ProjectStore } from 'src/app/core/stores';
import { TaskService } from '../_services';


@Injectable()
export class TaskStore extends Store<Task[]> {

  constructor(
    private projectStore: ProjectStore,
    private taskService: TaskService,
    private toastService: ToastService
  ) {
    super([]);
    this.projectStore.state$.subscribe(project => {
      if (!project) return;
      this.taskService.setProjectRoute(project._id);
      this.loadStateFromProject(project);
    })
  }

  private loadStateFromProject(project) {
    if (project && project.tasks) {
      this.setState([...project.tasks])
    }
  }

  getTasks() {
    return this.taskService
      .getTasks()
      .pipe(tap(tasks => this.setState([...tasks])))
  };

  createTasks(tasks) {
    return this.taskService
      .createTasks(tasks)
      .pipe(
        tap((tasks) => {
          this.setState([...this.state, ...tasks]);
          this.toastService.addToast({
            title: 'Success',
            message: `${tasks.length} new tasks added to pending`
          })
        }))
  }

  /** @param status done | undone */
  updateTaskStatus(task: Task) {
    const status = task.completedAt ? 'undone' : 'done';
    console.log('updating status');

    return this.taskService
      .updateTaskStatus(task._id, status)
      .pipe(
        tap(() => {
          const completionDate =
            status === 'done' ? new Date(Date.now()) : null;

          this.setState(
            this.state.map(item => {
              if (item._id !== task._id) return item;
              return { ...item, completedAt: completionDate }
            })
          )
        })
      )
  }

  /** State values */
  getTaskById(id: string): Task {
    return this.state.find((task) => task._id === id);
  }

  getPendingTasks() {
    return this.state.filter((x: Task) => !x.status);
  }

}
