import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'tu-invitation-card',
  template: `
    <article *ngIf="invitation">
      <tu-avatar [src]="invitation.author.avatarUrl" height='50px'></tu-avatar>
      {{invitation.author.name}} has invited you to join {{invitation.author.projectName}}
      <div>
        <button (click)="answer(true)"> Accept </button>   
        <button (click)="answer(false)"> Decline </button>
      </div>
    </article>
  `,
  styleUrls: ['./invitation-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvitationCardComponent {
  @Input() invitation;
  @Output() onAnswer = new EventEmitter<{ projectId: string, isAccepted: boolean }>();

  answer(isAccepted: boolean) {
    this.onAnswer.emit({ projectId: this.invitation.project, isAccepted })
  }
}
