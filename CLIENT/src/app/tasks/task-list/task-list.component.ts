import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
} from '@angular/core';
import { Task } from '../../models/Task';
import { ProjectBannerComponent } from '../../projects/project-banner/project-banner.component';
import { TaskService } from '../../services/task.service';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskDetailsModalComponent } from '../task-details-modal/task-details-modal.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgClass,
    TaskCardComponent,
    TaskDetailsModalComponent,
    EditTaskModalComponent,
    ProjectBannerComponent,
    NgIf,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, OnChanges {
  private authenticationService = inject(AuthenticationService);
  private tasksService = inject(TaskService);
  userTasks = this.tasksService.userTasks;
  isDetailsModalOpen = false;
  isEditTaskModalOpen = false;
  chosenTaskData!: Task;
  chosenTaskId?: number;
  currentChosenCategoryInSidebar = input.required<string>();
  userTasksToDisplay = computed(() => this.filterUserTasksToDisplay());
  projectDeleted = output<void>();

  ngOnInit() {
    if (this.authenticationService.currentUserSubject.value !== null) {
      this.loadUserTasks();
      this.filterUserTasksToDisplay();
    }
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
      case 'all': {
        return this.userTasks();
      }
      case 'today': {
        return this.userTasks().filter((task) => {
          const taskDate = new Date(task.deadline);
          return taskDate.toDateString() === currentDate.toDateString();
        });
      }
      case 'week': {
        return this.userTasks().filter((task) => {
          const taskDate = new Date(task.deadline);
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
      }
      default: {
        return this.filterTasksDependsOnProject();
      }
    }
  }

  filterTasksDependsOnProject() {
    return this.userTasks().filter((task) => {
      return (
        task.project === this.currentChosenCategoryInSidebar().toLowerCase()
      );
    });
  }

  openDetailsModal(taskId: number) {
    this.isDetailsModalOpen = true;
    this.chosenTaskId = taskId;

    this.chosenTaskData = this.findTaskById(taskId);
  }

  closeDetailsModal() {
    this.isDetailsModalOpen = false;
    this.chosenTaskId = undefined;
  }

  openEditTaskModal(taskId: number) {
    this.chosenTaskId = taskId;
    this.isEditTaskModalOpen = true;

    this.chosenTaskData = this.findTaskById(taskId);
  }

  closeEditTaskModal() {
    this.isEditTaskModalOpen = false;
  }

  handleProjectDeleted() {
    this.projectDeleted.emit();
  }

  private findTaskById(taskId: number): Task {
    return this.userTasks().filter((task) => task.id === taskId)[0];
  }
}
