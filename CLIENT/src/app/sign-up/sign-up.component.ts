import { NgClass, NgFor } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

function equalValues(firstControlName: string, secondControlName: string) {
  return (control: AbstractControl) => {
    const value1 = control.get(firstControlName)?.value;
    const value2 = control.get(secondControlName)?.value;

    if (value1 === value2) {
      return null;
    } else {
      return { valuesNotEqual: true };
    }
  };
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, NgClass, ReactiveFormsModule, NgFor],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  errorsFromApi: any[] = [];

  signUpForm = new FormGroup({
    username: new FormControl('', {
      validators: Validators.required,
      asyncValidators: (control) => {
        return this.authenticationService.checkUsername(control.value);
      },
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: (control) => {
        return this.authenticationService.checkEmail(control.value);
      },
      updateOn: 'blur',
    }),
    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', {
          validators: Validators.required,
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
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
      console.log(this.signUpForm.controls);
      return;
    }

    const registerForm = {
      username: this.signUpForm.value.username,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.passwords?.password,
    };

    this.authenticationService.register(registerForm).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);
        this.errorsFromApi = error.error;
        console.log(this.errorsFromApi[0].description);
      },
    });
  }
}
