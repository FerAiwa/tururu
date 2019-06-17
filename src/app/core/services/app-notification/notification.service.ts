import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { UserSocketService } from '../user-socket.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  invitation = new BehaviorSubject(null);
  invitation$ = this.invitation.asObservable();

  constructor(private userSocket: UserSocketService) { }

  OnNotification: Subscription = this.userSocket
    .onNotification()
    .subscribe(
      invitation => {
        console.log('notification socket invitation!', invitation);
        this.invitation.next(invitation)
      }
    )



}

