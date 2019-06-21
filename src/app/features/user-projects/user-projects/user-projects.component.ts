import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserStore } from 'src/app/core/stores';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tu-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss'],
})
export class UserProjectsComponent implements OnInit, OnDestroy {
  showIntroHelper;
  storeSubscription: Subscription;

  constructor(public userStore: UserStore) {

  }
  ngOnInit(): void {
    this.storeSubscription = this.userStore
      .state$.subscribe(
        user => {
          if (!user.projects.length) this.showIntroHelper = true;
        }
      )
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe()
  }


}
