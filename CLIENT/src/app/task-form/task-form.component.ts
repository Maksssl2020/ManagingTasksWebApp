import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  private taskService = inject(TaskService);
  private authenticationService = inject(AuthenticationService);
  private toastr = inject(ToastrService);
  @Input() chosenSideBarCategory: string | undefined;
  chosenPriority: string = 'low';

  priorityLevels = [
    {
      label: 'Low',
      value: 'low',
      buttonClass: 'button-overlay-low',
      textClass: 'priority-button-text-low',
      activeButtonClass: 'priority-button-active priority-button-active-low',
    },
    {
      label: 'Medium',
      value: 'medium',
      buttonClass: 'button-overlay-medium',
      textClass: 'priority-button-text-medium',
      activeButtonClass: 'priority-button-active priority-button-active-medium',
    },
    {
      label: 'High',
      value: 'high',
      buttonClass: 'button-overlay-high',
      textClass: 'priority-button-text-high',
      activeButtonClass: 'priority-button-active priority-button-active-high',
    },
  ];

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

  setChosenPrioroty(priority: string) {
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
      dueDate: this.newTaskForm.value.dueDate,
      priority: this.chosenPriority,
      project: this.getProjectNameDependsOnChosenCateogry(),
      userId: this.authenticationService.currentuser()?.id,
    };

    this.taskService.addNewTask(taskData).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success('Added new task!');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Something went wrong!');
      },
    });
  }

  getProjectNameDependsOnChosenCateogry() {
    switch (this.chosenSideBarCategory) {
      case 'all': {
        return 'general';
      }
      case 'Today': {
        return 'general';
      }
      case 'Week': {
        return 'general';
      }
      case 'Notes': {
        return 'general';
      }
      default: {
        return this.chosenSideBarCategory;
      }
    }
  }
}
