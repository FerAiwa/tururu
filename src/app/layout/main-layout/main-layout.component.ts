import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideLeftAnimation, slideRightAnimation } from '../../shared/animations/slider';
import { style, animate, animation, animateChild, useAnimation, group, sequence, transition, state, trigger, query, stagger } from '@angular/animations';

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
    trigger('invitation', [
      state('shown', style({
        transform: 'translateY(0)',
        opacity: 1,
      })),
      transition('void => *', [
        // style before for the component that is not yet loaded (initial state)
        style({
          transform: 'translateY(-100px)',
          opacity: 0,
        }),
        animate(100)
      ]),
    ])
  ]
})
export class MainLayoutComponent {
  showNotification = false;

  onNotification() {
    this.showNotification = !this.showNotification;

  }

  prepareRouteAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

}
