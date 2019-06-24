import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SprintStore } from '../_stores';
@Component({
  selector: 'tu-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent {

  sprintForm = this.fb.group({
    startsAt: ['', [Validators.required]],
    endsAt: ['', [Validators.required]], //Add validator start < end!
    reward: [''],
  });

  constructor(private fb: FormBuilder, private sprintStore: SprintStore, private router: Router, private route: ActivatedRoute) { }


  onSubmit() {
    this.sprintStore
      .createSprint(this.sprintForm.value)
      .subscribe(
        () => this.router.navigate([`project/${this.route.snapshot.params.id}`])
      )
  };

}
