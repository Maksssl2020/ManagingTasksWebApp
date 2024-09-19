import { Component, inject } from '@angular/core';
import { IconsService } from '../services/icons.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-task-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.scss',
})
export class AddTaskModalComponent {
  private iconsService = inject(IconsService);
  cancelIcon = this.iconsService.getIcon('cancel');
  activeCategory: string = 'task';

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }

  isActiveCategory(category: string): boolean {
    return this.activeCategory === category;
  }
}
