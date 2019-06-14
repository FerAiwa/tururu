import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MilisecondsMapperPipe } from 'src/app/shared/pipes/ms-mapper.pipe';

import { ProjectComponent } from './project/project.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
