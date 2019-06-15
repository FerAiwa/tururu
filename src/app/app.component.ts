import { Component, OnInit } from '@angular/core';
import { ProjectStore } from './core/stores/project.store';
import { Router } from '@angular/router';
import { UserService } from './core/services/user/user.service';


@Component({
  selector: 'tu-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'tururú';

  constructor(
    private projectStore: ProjectStore,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    if (this.userService.userInfo) {
      // After app init, navigates to user´s last accessed project.
      const lastProjectView = JSON.parse(localStorage.getItem('lastProjectView'));

      if (lastProjectView) {
        this.router.navigate(['project', lastProjectView.id]);
      } else {
        // Otherwise go to projects index.
        this.router.navigate(['user-projects'])
      }
    }
  }
}
