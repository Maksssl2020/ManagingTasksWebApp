import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SideBarComponent, TaskListComponent],
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
