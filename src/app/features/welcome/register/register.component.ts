import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/user/auth.service';
import { ToastService } from 'src/app/core/services/app-notification/toast.service';
// import { MatchPasswordValidator } from '../../validators/match-password.validator';

@Component({
  selector: 'tu-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    // { validators: MatchPasswordValidator }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  register() {
    const { name, email, password } = this.registerForm.value;

    if (this.registerForm.valid) {
      this.authService.register({ name, email, password })
        .subscribe(() => {
          this.toastService.addToast({
            title: 'Team',
            message: 'Registration success! Check your e-mail to verify your account.'
          }, 4500)
        });
    }
  }
}
