import { Component, inject } from '@angular/core';
import { IconsService } from '../services/icons.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private iconService = inject(IconsService);
  editIcon = this.iconService.getIcon('edit');
  deleteIcon = this.iconService.getIcon('delete');
}
