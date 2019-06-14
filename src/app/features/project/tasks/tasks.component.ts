import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query, stagger } from '@angular/animations';
import { Task } from '../../../core/core.models';
import { TaskStore } from 'src/app/core/stores/task.store';
import { SprintStore } from 'src/app/core/stores/sprint.store';

@Component({
  selector: 'tu-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // nice stagger effect when showing existing elements
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items', stagger(15, animateChild()), { optional: true })
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('.5s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('.5s cubic-bezier(.8,-0.6,0.2,1.5)',
          style(
            // { transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px' }
            { transform: 'scale(1) translateX(300px)', opacity: 0, height: '0px', margin: '0px' }
          )
        )
      ]),
    ])
  ],
})
export class TasksComponent {
  //modes = creation | project | sprint
  activeMode = 'project'; //If no tasks, make 'creation' as starting option.
  newTasks: Task[] = [];
  taskForm = this.fb.group({ name: ['', [Validators.required]], })

  constructor(private fb: FormBuilder, private taskStore: TaskStore, private sprintStore: SprintStore) { }

  /**
   * Adds or removes a task from a sprint from the project pile.
   */
  toggleAssignation({ _id }: Task) {
    const action = this.activeMode === 'project' ? 'addTask' : 'removeTask';
    return this.sprintStore[action](_id);
  }



  /*  Task Creation  */
  startTaskCreation() {
    this.newTasks = [];
    this.activeMode = 'creation';
  }

  addTask() {
    const name: string = this.taskForm.value.name;
    if (!name) return;
    this.newTasks.push({ name })
    this.taskForm.reset()
  }

  removeTask(i) {
    this.newTasks.splice(i, 1)
  }

  /**
   * Adds the generated tasks to the project task list.
   */
  saveAll() {
    this.taskStore.createTasks(this.newTasks).subscribe(
      () => this.newTasks = [])
  }
}
