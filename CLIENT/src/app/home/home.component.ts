import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoteListComponent } from '../notes/note-list/note-list.component';
import { AuthenticationService } from '../services/authentication.service';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TaskListComponent } from '../tasks/task-list/task-list.component';
import { SidebarService } from '../services/sidebar.service';
import { ActionModalComponent } from '../action-modal/action-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    SideBarComponent,
    TaskListComponent,
    NoteListComponent,
    ActionModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  private sidebarService = inject(SidebarService);
  private authSubscription!: Subscription;
  isUserLogged: boolean = false;
  currentChosenCategoryInSidebar!: string;
  windowWidth: number = innerWidth;
  isActionModalOpen: boolean = false;

  ngOnInit(): void {
    this.currentChosenCategoryInSidebar = 'all';

    this.authSubscription = this.authenticationService
      .currentUser()
      .subscribe((user) => {
        this.isUserLogged = user !== null;
      });

    this.sidebarService.sidebarState$.subscribe({
      next: (isOpen) => {
        console.log(isOpen);
      },
    });
  }

  toggleModal() {
    this.isActionModalOpen = !this.isActionModalOpen;
  }

  handleDataAdded() {
    this.isActionModalOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize() {
    this.windowWidth = innerWidth;
  }

  signIn() {
    this.router.navigate(['/sign-in']);
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

  setCurrentChosenCategoryInSidebar(category: string) {
    this.currentChosenCategoryInSidebar = category;
  }

  handleDeletedProject(sidebar: SideBarComponent) {
    sidebar.setChosenCategory('home');
    this.currentChosenCategoryInSidebar = 'home';
  }
}
