import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { style, animate, animateChild, transition, trigger, query, stagger } from '@angular/animations';

import { Task } from '../../../core/core.models';
import { TaskStore, SprintStore } from '../_stores';


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
    //modes: creation  project  sprint
    activeMode = 'project'; //If no tasks, make 'creation' as starting option.
    newTasks: Task[] = [];
    taskForm = this.fb.group({ name: ['', [Validators.required]], })

    constructor(
        private fb: FormBuilder,
        private taskStore: TaskStore,
        private sprintStore: SprintStore) {
    }

    addTasks(tasks) {
        console.log('added');
        this.newTasks.push(...tasks)
    }


    changeTaskMode(mode, { target }) {
        target.parentElement.parentElement
            .querySelectorAll('.option-selected')
            .forEach(el => el.classList.remove('option-selected'))

        target.classList.add('option-selected')

        if (mode === 'creation') this.newTasks = [];
        this.activeMode = mode;
    }

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

    addTask(task) {
        const name: string = task.value;

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
