import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
//Third party
import { NgCircleProgressModule, CircleProgressOptionsInterface } from 'ng-circle-progress';
//
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectComponent } from './project.component';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { SprintComponent } from './sprint/sprint.component';
import { WorksessionComponent } from './worksession/worksession.component';
import { TimerComponent } from './timer/timer.component';
import { TeamComponent } from './team/team.component';

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
    data: { animation: 'TaskBuilder' }
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
  declarations: [ProjectComponent, TasksComponent, SprintComponent, WorksessionComponent, TimerComponent, TeamComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    NgCircleProgressModule.forRoot(circleProgressDefault),
  ]
})
export class ProjectModule { }
