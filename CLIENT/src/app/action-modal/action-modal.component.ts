import { NgClass } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import {
  openCloseHiddenSidebar,
  openCloseModalAnimation,
} from '../animations/animations';
import { NoteFormComponent } from '../notes/note-form/note-form.component';
import { ProjectFormComponent } from '../projects/project-form/project-form.component';
import { IconService } from '../services/icon.service';
import { TaskFormComponent } from '../tasks/task-form/task-form.component';

@Component({
  selector: 'app-action-modal',
  standalone: true,
  imports: [
    NgClass,
    TaskFormComponent,
    ProjectFormComponent,
    NoteFormComponent,
  ],
  templateUrl: './action-modal.component.html',
  styleUrl: './action-modal.component.scss',
  animations: [openCloseModalAnimation, openCloseHiddenSidebar],
})
export class ActionModalComponent implements OnInit {
  private iconsService = inject(IconService);
  cancelIcon = this.iconsService.getIcon('cancel');
  hamburgerIcon = this.iconsService.getIcon('hamburger');
  isModalOpen = input.required<boolean>();
  activeCategory: string = 'task';
  activeSideBarCategory = input.required<string>();
  closeModal = output<void>();
  newTaskAdded = output<void>();
  isSidebarOpen: boolean = true;
  windowWidth: number = innerWidth;

  ngOnInit(): void {
    this.handleWindowResize();
  }

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  isActiveCategory(category: string): boolean {
    return this.activeCategory === category;
  }

  handleDataAdded() {
    this.closeModal.emit();
    this.newTaskAdded.emit();
  }

  @HostListener('window:resize', ['$event'])
  handleWindowResize() {
    this.windowWidth = innerWidth;

    if (innerWidth < 768) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
  }

  toggleOptionsSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
