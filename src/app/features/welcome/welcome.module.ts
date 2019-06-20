import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { WelcomeComponent } from './welcome.component';
import { RegisterComponent } from './register/register.component';

const welcomeRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(welcomeRoutes),
  ],
  declarations: [WelcomeComponent, RegisterComponent]
})
export class WelcomeModule { }
