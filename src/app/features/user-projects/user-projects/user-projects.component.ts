import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'tu-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProjectsComponent {

  constructor(public userService: UserService) { }

}
