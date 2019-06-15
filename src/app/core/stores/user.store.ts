import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { tap, take } from 'rxjs/operators';
import { interval } from 'rxjs';

import { Store } from 'src/app/shared/store/store';
import { UserService } from '../services/user/user.service';
import { User } from '../core.models';

/**
 * User store holds the state of the logged user.
 * - Is the source for the header project links and provides direct access to user public data.
 */
@Injectable({
  providedIn: 'root'
})
export class UserStore extends Store<User> {

  constructor(private userService: UserService, private socket: Socket) {
    super(null)
  }

  getUserInfo() {
    return this.userService
      .getUserInfo()
      .pipe(tap((user) => this.setState({ ...this.state, ...user })))
  }

  updateAvatar(image: File) {
    this.userService
      .uploadAvatar(image)
      .subscribe(() => this.refreshAvatar())
  };

  addProject() {

  }

  getAvatar() {
    return this.state.avatarUrl;
  }

  getUser() {
    const { name, avatarUrl, email } = this.state;
    return { name, avatarUrl, email };
  }

  // Temporal hotfix to force reload of image while I manage to properly manage this.
  refreshAvatar() {
    const timeStamp = new Date().getTime()
    const { avatarUrl } = this.state;
    const refreshAvatarUrl = `${avatarUrl}?updated={${timeStamp}}`;
    interval(3000)
      .pipe(take(1))
      .subscribe(() => {
        this.setState({ ...this.state, avatarUrl: refreshAvatarUrl })
        console.log('user state updated', this.state);
      })
  }
}
