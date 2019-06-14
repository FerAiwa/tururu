import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStore } from 'src/app/core/stores/user.store';

@Component({
  selector: '.tu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() notificate = new EventEmitter();
  showDropdown = false;

  constructor(private userStore: UserStore) { }

  showNotifications() {
    this.notificate.emit('pop')
  }

  // Toggles a collapse/expand dropdown transition from div position to the clicked icon
  toggleProjectList(dropdown: HTMLElement, event: MouseEvent) {
    this.showDropdown = !this.showDropdown;
    const { clientX, clientY } = event;
    const collapse = `scale(0) translate(${clientX}px, ${clientY}px)`;
    const expand = 'scale(1) translate(0,0)';

    const transformation = this.showDropdown ? expand : collapse;
    dropdown.style.setProperty('transform', transformation)
  }

}
