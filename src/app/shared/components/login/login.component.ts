import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/user/auth.service';
import { UserStore } from 'src/app/core/stores/user.store';
// import { MailValidator } from '../../validators/mail.validator';

@Component({
  selector: 'tu-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required,]], //MailValidator
    password: ['', [Validators.required, Validators.minLength(7)]] //7
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userStore: UserStore,
  ) { }

  login() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value)
        .subscribe(
          ({ uuid }) => {
            // update the user info, before project loading
            this.userStore.getUserInfo().subscribe(
              () => {
                const lastProjectView = JSON.parse(localStorage.getItem('lastProjectView'));
                // move this logic elsewhere
                if (lastProjectView && lastProjectView.uuid === uuid) {
                  this.router.navigate(['/project', lastProjectView.id])
                } else {
                  this.router.navigate(['/user-projects']);
                }
              })
          },
          () => this.loginForm.get('password').setValue('')
        )
    }
  }
}

