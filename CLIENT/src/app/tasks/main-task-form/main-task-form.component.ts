import { Component, output, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Task } from '../../models/Task';
import { TaskPriorityButtonComponent } from '../task-priority-button/task-priority-button.component';

function futureDateValidator(
  control: AbstractControl
): ValidationErrors | null {
  const currentDate = new Date().setHours(0, 0, 0, 0);
  const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);

  return selectedDate <= currentDate ? { futureDate: true } : null;
}

@Component({
  selector: 'app-main-task-form',
  standalone: true,
  imports: [TaskPriorityButtonComponent, ReactiveFormsModule],
  templateUrl: './main-task-form.component.html',
  styleUrl: './main-task-form.component.scss',
})
export class MainTaskFormComponent {
  taskData = input<any>();
  buttonName = input.required<string>();
  formSubmit = output<any>();
  chosenPriority: string = 'low';
  priorityLevels = ['low', 'medium', 'high'];

  taskForm = new FormGroup({
    title: new FormControl('', { validators: Validators.required }),
    details: new FormControl('', { validators: Validators.required }),
    deadline: new FormControl('', {
      validators: [Validators.required, futureDateValidator],
    }),
  });

  ngOnInit() {
    if (this.taskData()) {
      this.taskForm.patchValue(this.taskData());
      this.chosenPriority = this.taskData().priority.toLowerCase();
    }
  }

  setChosenPriority(priority: string) {
    this.chosenPriority = priority;
  }

  isPriorityChosen(priority: any): boolean {
    return priority === this.chosenPriority;
  }

  submitTask() {
    if (this.taskForm.invalid) {
      console.log(this.taskForm.controls);
      return;
    }

    console.log('SUBMIT');

    const task = {
      ...this.taskForm.value,
      priority: this.chosenPriority,
    };

    this.formSubmit.emit(task);
  }
}
