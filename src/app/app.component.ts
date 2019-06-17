import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from './core/stores/user.store';


@Component({
  selector: 'tu-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private userStore: UserStore, private router: Router) {
  }

  ngOnInit(): void {

    if (this.userStore.getUser()) {
      const lastProjectView = JSON.parse(localStorage.getItem('lastProjectView'));

      if (lastProjectView) {
        // After app init, navigates to user´s last accessed project.
        this.router.navigate(['project', lastProjectView.id]);
      } else {
        // Otherwise go to projects index.
        this.router.navigate(['user-projects'])
      }
    }
  }
}
