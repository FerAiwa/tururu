import { Component, ChangeDetectionStrategy, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NotificationService } from 'src/app/core/services/app-notification/notification.service';
import { UserStore } from 'src/app/core/stores/user.store';
import { AuthService } from 'src/app/core/services/user/auth.service';

@Component({
  selector: '.tu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @ViewChild('notificationBadge') notificationBadge: ElementRef;
  notificationSound = new Audio("./assets/sounds/cheerful.mp3");


  @Output() notificate = new EventEmitter();
  private notificationCounter = new BehaviorSubject<number>(0);
  notificationCounter$ = this.notificationCounter.asObservable();
  showDropdown = false;

  constructor(
    public userStore: UserStore,
    public notificationService: NotificationService,
    public authService: AuthService,
  ) {
    this.initializeNotificationListener();
  }

  private initializeNotificationListener() {
    const initialCounterState = this.userStore.getPendingInvitations().length;
    this.notificationCounter.next(initialCounterState);

    this.notificationService
      .onNotification()
      .subscribe(x => this.increaseNotificationCounter())

    this.notificationSound.load()
  }

  private increaseNotificationCounter() {
    const incValue = this.notificationCounter.getValue() + 1;
    this.notificationBadge.nativeElement.classList.toggle('badge--updated');
    this.notificationSound.play();
    return this.notificationCounter.next(incValue);
  };


  showNotifications() {
    this.notificate.emit('pop')
  }

  // Toggles a collapse/expand dropdown transition of the project menu
  toggleProjectList(dropdown: HTMLElement, event: MouseEvent) {
    this.showDropdown = !this.showDropdown;
    const { clientX, clientY } = event;
    const collapse = `scale(0) translate(${clientX}px, ${clientY}px)`;
    const expand = 'scale(1) translate(0,0)';

    const transformation = this.showDropdown ? expand : collapse;
    dropdown.style.setProperty('transform', transformation)
  }

}
