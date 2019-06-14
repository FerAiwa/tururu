import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { ModalService } from 'src/app/core/services/modal.service';
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
    private modalService: ModalService
  ) { }

  register() {
    const { name, email, password } = this.registerForm.value;

    if (this.registerForm.valid) {
      this.authService.register({ name, email, password }).subscribe(() => {
        console.log('Register success!');
        this.registerForm.reset();
        this.modalService.open(
          'Thanks to register!!',
          'Now go to you email account and check instructions for activating the account'
        );
      });
    }
  }
}
