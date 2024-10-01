import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TaskListComponent } from '../tasks/task-list/task-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SideBarComponent, TaskListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  isUserLogged = this.authenticationService.currentUser() !== null;
  currentChosenCategoryInSidebar!: string;

  ngOnInit(): void {
    this.currentChosenCategoryInSidebar = 'all';
  }

  signIn() {
    this.router.navigate(['/sign-in']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  setCurrentChosenCategoryInSidebar(category: string) {
    console.log(category);
    this.currentChosenCategoryInSidebar = category;
  }
}
