import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private socket: Socket) {
    this.socket.on('notification', (data) => {
      console.log(data);
      //subscribe -> /get notifications
      //update counter
    })
  }
}
