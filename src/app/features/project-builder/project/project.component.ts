import { Component, OnInit, ChangeDetectionStrategy, ViewChildren, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProjectStore } from '../../../core/stores/project.store';
import { tap } from 'rxjs/operators';
import { UserStore } from 'src/app/core/stores/user.store';

@Component({
  selector: 'tu-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  @ViewChildren(Input) inputs
  creationAudio = new Audio("./assets/sounds/youve-been-informed.mp3");
  formAudio = new Audio("./assets/sounds/intuition.mp3")
  dateDistance: number;

  projectForm = this.fb.group({
    name: ['', [Validators.required]],
    startAt: ['', [Validators.required]],
    deadline: ['', [Validators.required]],
    // sprintduration: ['7', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectStore: ProjectStore,
    private userStore: UserStore,

  ) {
    const today = new Date().toISOString().substr(0, 10);
    this.projectForm.patchValue({ startAt: today })
    this.creationAudio.load();
    this.formAudio.load();
  }
  playFocus() {
    this.formAudio.play()
  }

  get msStartDate(): Date {
    return new Date(this.projectForm.get('startAt').value);
  }

  get msEndDate(): Date {
    return new Date(this.projectForm.get('deadline').value);
  }

  ngOnInit() {
    this.projectForm.statusChanges
      .pipe(
        tap(() => {
          const timeDif = this.msEndDate.getTime() - this.msStartDate.getTime();
          if (timeDif) this.dateDistance = timeDif;
        }))
      .subscribe()
  }

  onSubmit() {
    const { name } = this.projectForm.value;
    this.projectStore
      .createProject(this.projectForm.value)
      .subscribe(projectId => {
        this.creationAudio.play();
        this.userStore.liveUpdateProjectList(projectId, name)
        this.router.navigate(['project', projectId])
      }
      )
  };
}

