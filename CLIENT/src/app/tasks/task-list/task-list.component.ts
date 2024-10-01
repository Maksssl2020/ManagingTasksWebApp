import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskDetailsModalComponent } from '../task-details-modal/task-details-modal.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { Task } from '../../modules/Task';
import { of } from 'rxjs';

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
export class TaskListComponent implements OnInit, OnChanges {
  private tasksService = inject(TaskService);
  userTasks = this.tasksService.userTasks;
  isDetailsModalOpen = false;
  isEditTaskModalOpen = false;
  chosenTaskId?: number;
  currentChosenCategoryInSidebar = input.required<string>();
  userTasksToDisplay = computed(() => this.filterUserTasksToDisplay());

  ngOnInit() {
    this.loadUserTasks();
    this.filterUserTasksToDisplay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentChosenCategoryInSidebar']) {
      this.filterUserTasksToDisplay();
    }
  }

  loadUserTasks() {
    this.tasksService.getUserTasks().subscribe({
      next: (tasks) => this.tasksService.userTasks.set(tasks),
    });
  }

  filterUserTasksToDisplay(): Task[] {
    let currentDate = new Date();
    const startOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    );
    const endOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)
    );
    currentDate = new Date();

    switch (this.currentChosenCategoryInSidebar()) {
      case 'today': {
        return this.userTasks().filter((task) => {
          const taskDate = new Date(task.deadline);
          taskDate.toDateString() === currentDate.toDateString();
        });
      }
      case 'week': {
        return this.userTasks().filter((task) => {
          const taskDate = new Date(task.deadline);
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
      }
      default: {
        return [...this.userTasks()];
      }
    }
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
