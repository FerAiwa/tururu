import { Component } from '@angular/core';
@Component({
  selector: 'tu-invitation-card',
  template: `
    <article>
      <tu-avatar [src]="user.avatarUrl" height='50px'></tu-avatar>
      {{user.name}} has invited you to join {{user.projectName}}
      <div>
        <button> Accept </button>   
        <button> Decline </button>
      </div>
    </article>
  `,
  styleUrls: ['./invitation-card.component.scss']
})
export class InvitationCardComponent {

  user = {
    avatarUrl: 'https://res.cloudinary.com/hackabos01fer/raw/upload/v1560535933/27cbcc45-6a20-4d8d-b4e9-9bf7058d846b.jpg',
    name: 'Fer',
    projectName: 'Tururú'
  }
}
