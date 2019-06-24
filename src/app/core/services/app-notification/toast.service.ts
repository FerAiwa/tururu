import { Injectable } from '@angular/core';
import { ToastData } from '../../core.models';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts = [];

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
