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
import { TaskService } from '../services/task.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { TaskPriorityButtonComponent } from '../task-priority-button/task-priority-button.component';

function futureDateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);

  if (selectedDate <= currentDate) {
    return { futureDate: true };
  } else {
    return null;
  }
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, TaskPriorityButtonComponent],
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

  priorityLevels = ['low', 'medium', 'high'];

  newTaskForm = new FormGroup({
    title: new FormControl('', {
      validators: Validators.required,
      updateOn: 'submit',
    }),
    details: new FormControl('', {
      validators: Validators.required,
      updateOn: 'submit',
    }),
    dueDate: new FormControl('', {
      validators: [Validators.required, futureDateValidator],
      updateOn: 'submit',
    }),
  });

  setChosenPriority(priority: string) {
    this.chosenPriority = priority;
  }

  isPriorityChosen(priority: string): boolean {
    return this.chosenPriority === priority;
  }

  addNewTask() {
    if (this.newTaskForm.invalid) {
      return;
    }

    const taskData = {
      title: this.newTaskForm.value.title,
      details: this.newTaskForm.value.details,
      deadline: this.newTaskForm.value.dueDate,
      priority: this.chosenPriority.toUpperCase(),
      project: this.getProjectNameDependsOnChosenCateogry(),
      userId: this.authenticationService.currentuser()?.id,
    };

    console.log(taskData);

    this.taskService.addNewTask(taskData).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success('Added new task!');
        this.newTaskAdded.emit();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Something went wrong!');
      },
    });
  }

  getProjectNameDependsOnChosenCateogry() {
    switch (this.chosenSideBarCategory()) {
      case 'all': {
        return 'home';
      }
      case 'Today': {
        return 'home';
      }
      case 'Week': {
        return 'home';
      }
      case 'Notes': {
        return 'home';
      }
      default: {
        return this.chosenSideBarCategory;
      }
    }
  }
}
