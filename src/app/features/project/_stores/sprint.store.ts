import { Store } from '../../../shared/store/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { ProjectStore } from 'src/app/core/stores';
import { Sprint } from '../../../core/core.models';
import { SprintService } from '../_services';


@Injectable()
export class SprintStore extends Store<Sprint> {

  constructor(
    private projectStore: ProjectStore,
    private sprintService: SprintService
  ) {
    super(null);
    console.log('initialized sprint store');
    this.projectStore.state$.subscribe(project => {
      if (!project) return
      this.loadStateFromProject(project);
      this.sprintService.setProjectRoute(project._id)
    })
  }

  /** Updates sprint state based on project state, if it holds active sprint data.
   * - When the user navigates between projects, the data recovered from API cascades from project store to child stores.
   * - The 'default' state (active Sprint) becomes available to consumers without the need of a explicit request.   */
  private loadStateFromProject(project) {
    const activeSprint: Sprint = project.activeSprint && project.sprints.find(x => x._id === project.activeSprint);
    if (activeSprint) {
      console.log('Loaded sprint from project state', activeSprint)
      return this.setState({ ...activeSprint })
    }
    return null
  }

  //## CRUD: SprintService CRUD => API => new Sprint State 
  createSprint(sprint) {
    return this.sprintService
      .create(sprint)
      .pipe(
        tap(sprint => this.setState({ ...this.state, ...sprint })),
      )
  }

  getSprint(id) {
    return this.sprintService
      .getSprint(id)
      .pipe(
        tap(sprint => this.setState({ ...this.state, ...sprint }))
      );
  }

  updateSprint(sprint) {
    return this.sprintService
      .update(sprint)
      .pipe(
        tap(() => this.setState({ ...this.state, ...sprint }))
      );
  }

  /** Operations on state values => Update Service => API response => State update */
  addTask(...id: string[]) {
    const newState = { ...this.state, tasks: [...this.state.tasks, ...id] }
    return this.updateSprint(newState).subscribe()
  }

  removeTask(id: string) {
    const sprint = { ...this.state };
    const i = sprint.tasks.findIndex(_id => id === _id);
    sprint.tasks.splice(i, 1);
    return this.updateSprint(sprint).subscribe()
  }

}
