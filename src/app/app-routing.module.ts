import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: './features/welcome/welcome.module#WelcomeModule',
    data: { animation: 'HomePage' }
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'settings',
        loadChildren: './features/settings/settings.module#SettingsModule',
      },
      {
        path: 'user-projects',
        loadChildren: './features/user-projects/user-projects.module#UserProjectsModule',
      },
      {
        path: 'project-builder',
        loadChildren: './features/project-builder/project-builder.module#ProjectBuilderModule',
        data: { animation: 'ProjectBuilder' }
      },
      {
        path: 'project/:id',
        canActivateChild: [AuthGuard],
        loadChildren: './features/project/project.module#ProjectModule',
        data: { animation: 'Project' }
      }
    ]
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
