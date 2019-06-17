import { NgModule, APP_INITIALIZER } from '@angular/core';

import { UserService } from './core/services/user/user.service';
import { AuthService } from './core/services/user/auth.service';

/**
 * If localstorage holds auth info, recover user data from server before app initializes.
 * Initialize otherwise.
 */
export function getInitialData(userService: UserService) {
  return () => {
    if (localStorage.getItem('auth')) {
      return new Promise(async resolve => {
        try {
          // May have a expired token...
          console.log('app init -> auth');
          await userService.getUserInfo().toPromise();

          return resolve();
        } catch (error) {
          console.log('app init -> no ath');
          localStorage.removeItem('auth');
          localStorage.removeItem('lastProjectView');

          return resolve(error);
        }
      });
    }

    return Promise.resolve();
  };
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getInitialData,
      deps: [UserService],
      multi: true
    }
  ]
})
export class AppInitializerModule { }
