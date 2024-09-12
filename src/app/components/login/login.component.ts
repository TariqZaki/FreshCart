import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  msgError: string = '';
  isLoading: boolean = false;
  msgSuccess: boolean = false;

  loginform: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],

    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginFormSubmit(): void {
    if (this.loginform.valid) {
      this.isLoading = true;
      this._AuthService.setLoginForm(this.loginform.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == 'success') {
            this.isLoading = false;
            this.msgSuccess = true;
            setTimeout(() => {
              // 1- save token
              localStorage.setItem('userToken', res.token);
              // 2-decode token
              this._AuthService.saveUserData();
              // 3-navigate to home
              this._Router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.msgError = err.error.message;
        },
      });
    } else {
      this.loginform.setErrors({ mismatch: true });
      this.loginform.markAllAsTouched();
    }
  }
}
