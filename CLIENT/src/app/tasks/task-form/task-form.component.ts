import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import 'ngx-toastr/toastr';
import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { TaskPriorityButtonComponent } from '../task-priority-button/task-priority-button.component';
import { MainTaskFormComponent } from '../main-task-form/main-task-form.component';
import { Task } from '../../modules/Task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    TaskPriorityButtonComponent,
    MainTaskFormComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  private taskService = inject(TaskService);
  private authenticationService = inject(AuthenticationService);
  private toastr = inject(ToastrService);
  chosenPriority: string = 'low';
  chosenSideBarCategory = input.required<string>();
  newTaskAdded = output<void>();

  addNewTask(task: Task) {
    const taskData = {
      ...task,
      project: this.getProjectNameDependsOnChosenCategory(),
      userId: this.authenticationService.currentUser()?.id,
    };

    console.log(taskData);

    this.taskService.addNewTask(taskData).subscribe({
      next: () => {
        this.toastr.success('Added new task!');
        this.newTaskAdded.emit();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Something went wrong!');
      },
    });
  }

  getProjectNameDependsOnChosenCategory() {
    switch (this.chosenSideBarCategory()) {
      case 'all': {
        return 'home';
      }
      case 'today': {
        return 'home';
      }
      case 'week': {
        return 'home';
      }
      case 'notes': {
        return 'home';
      }
      default: {
        return this.chosenSideBarCategory().toLowerCase();
      }
    }
  }
}
