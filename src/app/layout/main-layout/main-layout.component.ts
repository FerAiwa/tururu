import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideLeftAnimation, slideRightAnimation } from '../../shared/animations/slider';
import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query, stagger } from '@angular/animations';

import { NotificationService } from 'src/app/core/services/app-notification/notification.service';
import { InvitationCardComponent } from 'src/app/shared/components/invitation-card/invitation-card.component';
import { InvitationService } from 'src/app/core/services/user/invitation.service';
import { UserSocketService } from 'src/app/core/services/user-socket.service';


const projectToChildren =
  'Project => TaskBuilder, Project => Sprint, Project => Worksession, Project => Timer';
const componentsToProject =
  'TaskBuilder => Project,  Sprint => Project, Worksession => Project, Timer => Project'

@Component({
  selector: 'tu-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    trigger('routeAnimations', [
      state('fade', style({ opacity: .25 })),
      state('show', style({ opacity: 1 })),
      transition('fade <=> normal', [
        animate(100)
      ]),
      transition('HomePage => ProjectBuilder', slideRightAnimation),
      transition('ProjectBuilder => HomePage', slideRightAnimation),
      transition(projectToChildren, slideRightAnimation),
      transition(componentsToProject, slideLeftAnimation),
      transition('WorkSession => Timer', slideRightAnimation),
      transition('Timer => *', slideLeftAnimation),
    ]),
    trigger('invitationAnimation', [
      state('shown', style({
        transform: 'translateY(0) scale(1)',
        opacity: 1,
      })),
      transition('void => shown', [
        // style before for the component that is not yet loaded (initial state)
        style({
          transform: 'translateY(-200px) scale(.5)',
          opacity: 0,
        }),
        animate('1s ease-in')
      ]),
    ])
  ]
})
export class MainLayoutComponent {
  showNotification = true;
  notification;

  constructor(
    private userSocket: UserSocketService,
    public notificationService: NotificationService,
    public invitationService: InvitationService) {
  }

  sendAnswer({ projectId, isAccepted }) {
    this.invitationService.answerProjectInvitation(projectId, isAccepted);
    this.showNotification = false;
  }


  prepareRouteAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

  ngOnInit(): void {
    this.userSocket
      .onNotification()
      .subscribe(x => {
        this.notification = x;
        this.showNotification = true;
      })
  }

}
