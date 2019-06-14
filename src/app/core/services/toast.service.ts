import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { ToastData, TeamToastData, WorkSession } from '../core.models';
import { TeamStore } from '../stores/team.store';
import { TaskStore } from '../stores/task.store';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = [];

  constructor(
    private socket: Socket,
    private teamStore: TeamStore,
    private taskStore: TaskStore
  ) {
    this.socket.on('workSessionStartTeamNotify', (ws: WorkSession) => {
      const task = this.taskStore.getTaskById(ws.taskId);
      const user = this.teamStore.getTeamMemberInfo(ws.uuid);
      const toastData = {
        title: 'WorkSession',
        message: `${user.name} has started ${task.name}`,
        user,
        task: task.name,
      }
      this.addToast(toastData)
    })
  }

  addToast(toastData, delay: number = 3500) {
    if ('task' in toastData) {
      this.toasts.unshift(toastData);
    } else {
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
