import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserProjectsComponent } from './user-projects/user-projects.component';

const routes: Routes = [
  {
    path: '',
    component: UserProjectsComponent,
  },
]

@NgModule({
  declarations: [UserProjectsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class UserProjectsModule { }
