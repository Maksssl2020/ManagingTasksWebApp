import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskDetailsModalComponent } from '../task-details-modal/task-details-modal.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgClass,
    TaskCardComponent,
    TaskDetailsModalComponent,
    EditTaskModalComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  private tasksService = inject(TaskService);
  userTasks = this.tasksService.loadedUserTasks;
  isDetailsModalOpen = false;
  isEditTaskModalOpen = false;
  chosenTaskId?: number;

  ngOnInit() {
    if (
      this.tasksService.loadedUserTasks().length === 0 ||
      this.tasksService.loadedUserTasks().length !== this.userTasks.length
    ) {
      this.loadUserTasks();
    }
  }

  loadUserTasks() {
    this.tasksService.getUserTasks();
  }

  openDetailsModal(taskId: number) {
    this.isDetailsModalOpen = true;
    this.chosenTaskId = taskId;
  }

  closeDetailsModal() {
    this.isDetailsModalOpen = false;
    this.chosenTaskId = undefined;
  }

  openEditTaskModal(taskId: number) {
    console.log('Opening edit task modal');
    this.isEditTaskModalOpen = true;
    this.chosenTaskId = taskId;
  }

  closeEditTaskModal() {
    this.isEditTaskModalOpen = false;
  }
}
