import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { ProjectStore } from 'src/app/core/stores/project.store';
import { SprintStore } from 'src/app/core/stores/sprint.store';

@Component({
  selector: 'tu-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  login = true;

  constructor(
    private auth: AuthService,
  ) {
    console.log('Loading welcome');
  }

  ngOnInit() {
  }

}
