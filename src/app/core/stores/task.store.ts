import { Store } from '../../shared/store/store';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';

import { Task } from '../core.models';
import { TaskService } from '../services/project-flow/task.service';
import { ProjectStore } from './project.store';

@Injectable({
  providedIn: 'root'
})

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
      const tasks: Task[] = [...project.tasks];
      console.log('Loaded tasks from project state', project.tasks)
      this.setState(tasks)
    }
  }

  /** State Changers */
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

  /** State values */
  getTaskById(id: string): Task {
    return this.state.find((task) => task._id === id);
  }

  getPendingTasks() {
    return this.state.filter((x: Task) => !x.status);
  }



}
