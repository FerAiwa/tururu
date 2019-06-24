import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//Third party
import { NgCircleProgressModule, CircleProgressOptionsInterface } from 'ng-circle-progress';

import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorInterceptor } from 'src/app/core/interceptors/error.interceptor';
import { JWTInterceptor } from 'src/app/core/interceptors/jwt.interceptor';
import {
  ActiveSessionsService, SprintService, TaskService, TeamService, WorksessionService
} from './_services';
import { SprintStore, TaskStore, TeamStore, WorkSessionStore } from './_stores';
import { ProjectComponent } from './project.component';
import { TasksComponent } from './tasks/tasks.component';
import { SprintComponent } from './sprint/sprint.component';
import { TimerComponent } from './timer/timer.component';
import { TeamComponent } from './team/team.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { WorksessionComponent } from './worksession/worksession.component';

const circleProgressDefault: CircleProgressOptionsInterface = {
  percent: 85,
  radius: 100,
  outerStrokeWidth: 5,
  innerStrokeWidth: 4,
  outerStrokeColor: "#78C000",
  innerStrokeColor: "#C7E596",
  animation: true,
  animationDuration: 300,
  titleFontSize: "46px",
  unitsFontSize: "30ox",
  subtitleFontSize: "17px",
  responsive: true,
};

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
    data: { animation: 'TaskManager' }
  },
  {
    path: 'sprint',
    component: SprintComponent,
    data: { animation: 'Sprint' },
  },
  {
    path: 'worksessions',
    component: WorksessionComponent,
    data: { animation: 'Worksession' }
  },
  {
    path: 'timer',
    component: TimerComponent,
    data: { animation: 'Timer' }
  }
]
@NgModule({
  declarations: [
    ProjectComponent,
    TasksComponent,
    SprintComponent,
    WorksessionComponent,
    TimerComponent,
    TeamComponent,
    UserSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot(circleProgressDefault),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ActiveSessionsService,
    SprintService,
    TaskService,
    TeamService,
    WorksessionService,
    SprintStore,
    TaskStore,
    TeamStore,
    WorkSessionStore
  ]
})
export class ProjectModule { }
