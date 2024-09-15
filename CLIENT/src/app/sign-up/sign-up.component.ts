import { NgClass } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { debounceTime, of } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, NgClass, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private destroyRef = inject(DestroyRef);

  signUpForm = new FormGroup({
    username: new FormControl('', {
      validators: Validators.required,
      asyncValidators: (control) => {
        if (this.authenticationService.checkUsername(control.value)) {
          return of(null);
        } else {
          return of({ noUnique: true });
        }
      },
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: (control) => {
        if (this.authenticationService.checkEmail(control.value)) {
          return of(null);
        } else {
          return of({ noUnique: true });
        }
      },
    }),
    passwords: new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', {
        validators: Validators.required,
      }),
    }),
  });

  ngOnInit(): void {
    const savedForm = localStorage.getItem('saved-register-form');

    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);
      this.signUpForm.patchValue({
        username: loadedForm.username,
        email: loadedForm.email,
      });
    }

    const subscription = this.signUpForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          localStorage.setItem(
            'saved-register-form',
            JSON.stringify({ username: value.username, email: value.email })
          );
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  register() {
    if (this.signUpForm?.invalid) {
      console.log(this.signUpForm?.value);
      console.log(this.signUpForm.errors);
      return;
    }

    this.authenticationService.register(this.signUpForm.value).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  get usernameIsInvalid() {
    return (
      this.signUpForm.controls.username.touched &&
      this.signUpForm.controls.username.invalid
    );
  }

  get emailIsInvalid() {
    return (
      this.signUpForm.controls.email.touched &&
      this.signUpForm.controls.email.invalid
    );
  }

  // get passwordIsInvalid() {
  //   return (
  //     this.signUpForm.controls.passwords.touched &&
  //     this.signUpForm.controls.password.invalid
  //   );
  // }

  get username() {
    return this.signUpForm?.get('username');
  }

  get email() {
    return this.signUpForm?.get('email');
  }

  get password() {
    return this.signUpForm?.get('password');
  }
}
