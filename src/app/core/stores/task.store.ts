import { Store } from '../../shared/store/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Task } from '../core.models';
import { TaskService } from '../services/project-flow/task.service';
import { ProjectStore } from './project.store';

@Injectable()
export class TaskStore extends Store<Task[]> {

  constructor(private projectStore: ProjectStore, private taskService: TaskService) {
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
      .pipe(tap((tasks) => this.setState([...this.state, ...tasks])));
  }

  /** @param status done | undone */
  updateTaskStatus(task: Task, status: string) {
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