import { Component, inject, input, OnInit, output } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../modules/Task';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize-first-letter.pipe';
import { IconsService } from '../../services/icons.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-task-details-modal',
  standalone: true,
  imports: [CapitalizeFirstLetterPipe, NgClass],
  templateUrl: './task-details-modal.component.html',
  styleUrl: './task-details-modal.component.scss',
})
export class TaskDetailsModalComponent implements OnInit {
  private taskService = inject(TaskService);
  private iconService = inject(IconsService);
  taskId = input.required<number>();
  chosenTaskData?: Task;
  modalData: { label: string; taskData?: any }[] = [];
  cancelIcon?: string;
  closeModal = output<void>();

  ngOnInit(): void {
    this.loadChosenTask();
    this.cancelIcon = this.iconService.getIcon('cancel');
  }

  loadChosenTask() {
    if (!this.taskId) {
      return;
    }

    this.taskService.getUserTask(this.taskId()).subscribe({
      next: (task) => {
        this.chosenTaskData = task;

        this.modalData = [
          {
            label: 'Project',
            taskData: this.chosenTaskData?.project,
          },
          {
            label: 'Priority',
            taskData: this.chosenTaskData?.priority.toLowerCase(),
          },
          {
            label: 'Due Date',
            taskData: this.chosenTaskData?.deadline,
          },
          {
            label: 'Details',
            taskData: this.chosenTaskData?.details,
          },
        ];
      },
    });
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
