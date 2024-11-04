import {
  AfterViewInit,
  Component,
  HostListener,
  inject,
  input,
  OnInit,
  output,
  Signal,
  ViewChild,
} from '@angular/core';
import { ActionModalComponent } from '../modals/action-modal/action-modal.component';
import { NgClass } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { openCloseHiddenSidebar } from '../animations/animations';
import { SidebarService } from '../services/sidebar.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ActionModalComponent, NgClass],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  animations: [openCloseHiddenSidebar],
})
export class SideBarComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private projectService = inject(ProjectService);
  private sidebarService = inject(SidebarService);
  userProjects = this.projectService.userProjects;
  chosenCategory!: string;
  currentCategory = output<string>();
  toggleActionModal = output<void>();
  isSidebarOpen: boolean = false;
  windowWidth: number = innerWidth;

  ngOnInit(): void {
    if (this.authenticationService.currentUserSubject.value !== null) {
      this.loadUserProjects();
    }

    this.sidebarService.sidebarState$.subscribe({
      next: (sidebar) => {
        if (sidebar) {
          this.chosenCategory = sidebar.activeCategory;
          this.currentCategory.emit(this.chosenCategory);
        }
      },
    });

    this.handleWindowResize();
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize() {
    this.windowWidth = innerWidth;
    if (innerWidth < 768) {
      this.sidebarService.sidebarState$.subscribe({
        next: (isOpen) => {
          console.log(isOpen);
          if (isOpen) {
            this.isSidebarOpen = isOpen?.state;
          }
        },
      });
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutsideSidebar(event: MouseEvent) {
    if (this.windowWidth < 768 && this.isSidebarOpen === true) {
      const clickedInsideArea =
        (event.target as HTMLElement).closest('.side-bar-container') ||
        (event.target as HTMLElement).closest('.modal-overlay');

      if (clickedInsideArea === null) {
        this.sidebarService.toggleSidebar();
      }
    }
  }

  loadUserProjects() {
    this.projectService.getUserProjects().subscribe({
      next: (projects) => this.projectService.userProjects.set(projects),
    });
  }

  toggleModal() {
    this.toggleActionModal.emit();
  }

  setChosenCategory(category: string) {
    this.sidebarService.setActiveCategory(category);
    this.currentCategory.emit(this.chosenCategory);
  }

  isCategoryChosen(category: string): boolean {
    return category === this.chosenCategory;
  }

  handleProjectDeleted() {
    this.setChosenCategory('home');
  }
}
