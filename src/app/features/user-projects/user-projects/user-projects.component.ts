import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserStore } from 'src/app/core/stores';

@Component({
  selector: 'tu-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProjectsComponent {

  constructor(public userStore: UserStore) { }

}
