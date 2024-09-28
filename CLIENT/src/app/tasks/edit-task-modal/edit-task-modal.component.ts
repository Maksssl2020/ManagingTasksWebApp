import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../modules/Task';
import { TaskService } from '../../services/task.service';
import { TaskPriorityButtonComponent } from '../task-priority-button/task-priority-button.component';
import { NgClass } from '@angular/common';
import { IconsService } from '../../services/icons.service';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [TaskPriorityButtonComponent, FormsModule, NgClass],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
})
export class EditTaskModalComponent implements OnInit {
  private taskService = inject(TaskService);
  private iconService = inject(IconsService);
  cancelIcon?: string;
  chosenPriority: string = 'low';
  priorityLevels = ['low', 'medium', 'high'];
  taskId = input.required<number>();
  chosenTaskData!: Task;
  closeModal = output<void>();

  ngOnInit(): void {
    this.loadChosenTask();
    this.cancelIcon = this.iconService.getIcon('cancel');
  }

  loadChosenTask() {
    this.taskService.getUserTask(this.taskId()).subscribe({
      next: (task) => {
        this.chosenTaskData = task;
        this.chosenPriority = task.priority.toLowerCase();
      },
    });
  }

  setChosenPriority(priority: string) {
    this.chosenPriority = priority;
  }

  isPriorityChosen(priority: string): boolean {
    return this.chosenPriority === priority;
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
