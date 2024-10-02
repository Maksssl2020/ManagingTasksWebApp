import { Component, inject, input, output } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { DatePipe, NgClass } from '@angular/common';
import { Task } from '../../modules/Task';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  private tasksService = inject(TaskService);
  private iconService = inject(IconsService);
  private toastr = inject(ToastrService);
  editIcon = this.iconService.getIcon('edit');
  deleteIcon = this.iconService.getIcon('delete');
  taskData = input.required<Task>();
  showTaskDetailsModal = output<number>();
  editTask = output<number>();

  deleteTask(id: number) {
    this.tasksService.deleteUserTask(id).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success('Task has been deleted!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openTaskDetailsModal() {
    this.showTaskDetailsModal.emit(this.taskData().id);
  }

  handleEditTask() {
    console.log('Edit task clicked', this.taskData().id);
    this.editTask.emit(this.taskData().id);
  }
}