import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  isUserLogged = this.authenticationService.currentuser() !== null;

  signIn() {
    this.router.navigate(['/sign-in']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }
}
