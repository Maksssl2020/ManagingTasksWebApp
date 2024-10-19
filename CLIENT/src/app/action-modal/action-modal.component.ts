import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { openCloseModalAnimation } from '../animations/animations';
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
  animations: [openCloseModalAnimation],
})
export class ActionModalComponent {
  private iconsService = inject(IconService);
  cancelIcon = this.iconsService.getIcon('cancel');
  isModalOpen = input.required<boolean>();
  activeCategory: string = 'task';
  activeSideBarCategory = input.required<string>();
  closeModal = output<void>();
  newTaskAdded = output<void>();

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
}
