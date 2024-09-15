import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  model: any = {};
  errorMessage: string | undefined;

  login() {
    this.authenticationService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error;
      },
    });
  }
}
