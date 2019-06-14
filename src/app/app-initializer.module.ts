import { NgModule, APP_INITIALIZER } from '@angular/core';

import { UserStore } from './core/stores/user.store';
// import { NotificationService } from './core/services/notification.service';
/**
 * If localstorage holds auth info, recover user data from server before app initializes.
 * Initialize otherwise.
 */
export function getInitialData(userStore: UserStore) {
  return () => {
    if (localStorage.getItem('auth')) {
      return new Promise(async resolve => {
        try {
          await userStore.getUserInfo().toPromise();

          return resolve();
        } catch (error) {
          localStorage.removeItem('auth'); // refresh token?
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
      deps: [UserStore], //NotificationService
      multi: true
    }
  ]
})
export class AppInitializerModule { }
