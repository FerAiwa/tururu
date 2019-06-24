import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from './core/services/app-notification/notification.service';
import { UserService } from './core/services/user/user.service';
import { UserStore } from './core/stores/user.store';

@Component({
  selector: 'tu-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private userStore: UserStore,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router) {
    if (this.userService.userInfo) {
      this.userStore.setState(this.userService.userInfo);
    }
  }

  ngOnInit(): void {
    console.log('APP COMPONENT INIT');
    if (this.userStore.getUser()) {
      console.log(this.userStore.getUser());
      const lastProjectView = JSON.parse(localStorage.getItem('lastProjectView'));

      if (lastProjectView) {
        // After app init, navigates to user´s last accessed project.
        console.log('navigating from last project');
        this.router.navigate(['project', lastProjectView.id]);
      } else {
        // Otherwise go to projects index.
        this.router.navigate(['user-projects'])
      }
    }
  }
}
