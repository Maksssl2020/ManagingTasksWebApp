import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
} from '@angular/core';
import { IconsService } from '../services/icons.service';
import { NgClass } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { NoteFormComponent } from '../note-form/note-form.component';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [
    NgClass,
    TaskFormComponent,
    ProjectFormComponent,
    NoteFormComponent,
  ],
  templateUrl: './action-modal.component.html',
  styleUrl: './action-modal.component.scss',
})
export class ActionModalComponent {
  private iconsService = inject(IconsService);
  cancelIcon = this.iconsService.getIcon('cancel');
  activeCategory: string = 'task';
  @Input() activeSideBarCategory: string | undefined;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  isActiveCategory(category: string): boolean {
    return this.activeCategory === category;
  }
}
