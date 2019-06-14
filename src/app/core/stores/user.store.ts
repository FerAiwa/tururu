import { Injectable } from '@angular/core';
import { Store } from 'src/app/shared/store/store';
import { tap } from 'rxjs/operators';

import { User } from '../core.models';
import { UserService } from '../services/user.service';

/**
 * User store holds the state of the logged user.
 * - Is the source for the header project links and provides direct access to user public data.
 */
@Injectable({
  providedIn: 'root'
})
export class UserStore extends Store<User> {

  constructor(private userService: UserService) {
    super(null)
  }

  getUserInfo() {
    return this.userService
      .getUserInfo()
      .pipe(tap((user) => this.setState({ ...this.state, ...user })))
  }

  updateAvatar(url: string) {
    // this.setState(...this.state, avatar: avatarUrl);
  }

  addProject() {

  }

  getAvatar() {
    return this.state.avatarUrl;
  }

  getUser() {
    const { name, avatarUrl, email } = this.state;
    return { name, avatarUrl, email };
  }


}
