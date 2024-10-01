import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../modules/Task';
import { IconsService } from '../../services/icons.service';
import { TaskService } from '../../services/task.service';
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
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [
    TaskPriorityButtonComponent,
    FormsModule,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
})
export class EditTaskModalComponent implements OnInit {
  private taskService = inject(TaskService);
  private iconService = inject(IconsService);
  private toastr = inject(ToastrService);
  cancelIcon?: string;
  chosenPriority: string = 'low';
  priorityLevels = ['low', 'medium', 'high'];
  taskId = input.required<number>();
  chosenTaskData!: Task;
  closeModal = output<void>();

  editTaskFormControl = new FormGroup({
    title: new FormControl('', {
      validators: Validators.required,
      updateOn: 'change',
    }),
    details: new FormControl('', {
      validators: Validators.required,
      updateOn: 'change',
    }),
    dueDate: new FormControl('', {
      validators: [Validators.required, futureDateValidator],
      updateOn: 'change',
    }),
  });

  ngOnInit(): void {
    this.loadChosenTask();
    this.cancelIcon = this.iconService.getIcon('cancel');
  }

  loadChosenTask() {
    this.taskService.getUserTask(this.taskId()).subscribe({
      next: (task) => {
        this.chosenTaskData = task;
        this.chosenPriority = task.priority.toLowerCase();
        this.editTaskFormControl.patchValue({
          title: task.title,
          details: task.details,
          dueDate: task.deadline,
        });
      },
    });
  }

  setChosenPriority(priority: string) {
    this.chosenPriority = priority;
  }

  isPriorityChosen(priority: string): boolean {
    return this.chosenPriority === priority;
  }

  updateTask() {
    if (this.editTaskFormControl.invalid) {
      return;
    }
    console.log(this.editTaskFormControl.controls);

    let updatedTask = {
      id: this.chosenTaskData.id,
      title: this.editTaskFormControl.value.title!,
      deadline: this.editTaskFormControl.value.dueDate!,
      details: this.editTaskFormControl.value.details!,
      priority: this.chosenPriority,
    };

    console.log(updatedTask);
    this.taskService.updateUserTask(updatedTask).subscribe({
      next: () => {
        this.editTaskFormControl.reset;
        this.handleCloseModal();
        this.toastr.success('Task updated successfully!');
      },
    });
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
