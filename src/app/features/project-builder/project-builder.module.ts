import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectComponent } from './project/project.component';

const builderRoutes: Routes = [
  {
    path: '',
    component: ProjectComponent,
  },
]
@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(builderRoutes),
  ]
})
export class ProjectBuilderModule { }
