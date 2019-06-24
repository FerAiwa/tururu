import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TaskListComponent } from './components/task-list/task-list.component';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';
import { MilisecondsMapperPipe } from './pipes/ms-mapper.pipe';
import { IconMenuComponent } from './components/icon-menu/icon-menu.component';
import { LoginComponent } from './components/login/login.component';
import { ToastComponent } from './components/toast/toast.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { InvitationCardComponent } from './components/invitation-card/invitation-card.component';
import { SearchDebouncerDirective } from './directives/search-debouncer.directive';
import { CompletedTasksPipe } from './pipes/completed-tasks.pipe';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { BuildOnDropDirective } from './directives/build-on-drop.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    AvatarComponent,
    CompletedTasksPipe,
    CheckboxComponent,
    FilterTasksPipe,
    IconMenuComponent,
    LoginComponent,
    MilisecondsMapperPipe,
    ProgressBarComponent,
    ProjectCardComponent,
    TaskListComponent,
    ToastComponent,
    InvitationCardComponent,
    SearchDebouncerDirective,
    CompletedTasksPipe,
    CheckboxComponent,
    BuildOnDropDirective,
  ],
  exports: [
    AvatarComponent,
    BuildOnDropDirective,
    CheckboxComponent,
    CompletedTasksPipe,
    FilterTasksPipe,
    MilisecondsMapperPipe,
    IconMenuComponent,
    SearchDebouncerDirective,
    LoginComponent,
    ToastComponent,
    ProgressBarComponent,
    ProjectCardComponent,
    InvitationCardComponent
  ]
})
export class SharedModule { }
