import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserStore } from 'src/app/core/stores/user.store';
import { User } from 'src/app/core/core.models';

@Component({
  selector: 'tu-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fallbackAvatarUrl = 'https://media.licdn.com/dms/image/C5603AQG5zStVST5xkA/profile-displayphoto-shrink_200_200/0?e=1565827200&v=beta&t=eYwQoF0jwwduCEkPJrI-3nzEnsV16D0EzrTdvEYcnYI'
  userStoreSubscription: Subscription;
  user: User;

  constructor(private userStore: UserStore) { }

  ngOnInit() {
    this.userStoreSubscription = this.userStore.state$
      .subscribe(user => {
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.userStoreSubscription.unsubscribe();
  }

}
