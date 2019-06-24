import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { ToastData, TeamToastData, WorkSession } from '../../core.models';
import { ProjectSocketService } from '../project-socket.service';
import { TaskStore, TeamStore } from '../../stores';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = [];

  constructor(
    // private socket: Socket,
    // private teamStore: TeamStore,
    //private taskStore: TaskStore,
    // private projectSocket: ProjectSocketService,
  ) {
    console.log('init toast service');
    // type: 'member state',
    // user: authorData,
    // message: 'joined the team',

    //Podria hacer un pipe y hacer un sólo evento de notificacion.
    // this.projectSocket
    //   .onNotifyNewTeamMember()
    //   .subscribe(
    //     (teamNotification) => {
    //       const { user, message } = teamNotification;
    //       this.addToast({
    //         title: 'Team',
    //         message: `${user.name} ${message}`,
    //       })
    //     }
    //   );

    // this.socket.on('workSessionStartTeamNotify', (ws: WorkSession) => {
    //   const task = this.taskStore.getTaskById(ws.taskId);
    //   const user = this.teamStore.getTeamMemberInfo(ws.uuid);
    //   const toastData = {
    //     title: 'WorkSession',
    //     message: `${user.name} has started ${task.name}`,
    //     user,
    //     task: task.name,
    //   }
    //   this.addToast(toastData)
    // })
  }


  addToast(toastData, delay: number = 4500) {
    console.log(toastData);
    if ('title' in toastData) {
      this.toasts.unshift(toastData);
    }
    else if ('context' in toastData) {
      this.toasts.unshift({
        title: 'Error',
        message: toastData.message,
      })
    }
    else {
      this.toasts.unshift({
        title: 'Error',
        message: this.getErrorMessage(toastData.error),
        variant: 'danger'
      });
    }

    this.delayAndRemove(delay);
  }

  getErrorMessage({ message, data }): string {
    if (message) {
      return message;
    }

    if (data) {
      return `You ${data.label} is wrong`;
    }
  }

  isErrorToast(toast: ToastData) {
    if (toast.variant === 'error') {
      return true;
    }
    return false;
  }

  delayAndRemove(milliseconds: number) {
    setTimeout(() => {
      this.toasts.pop();
    }, milliseconds);
  }

  remove(index?: number) {
    if (index) {
      this.toasts.splice(index, 1);
    } else {
      this.toasts.pop();
    }
  }
}
