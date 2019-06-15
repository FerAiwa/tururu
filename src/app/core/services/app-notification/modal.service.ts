import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  opened = false;
  title = '';
  content = '';

  open(title: string, content: string) {
    this.opened = true;
    this.title = title;
    this.content = content;
  }

  close() {
    this.opened = false;
  }
}
