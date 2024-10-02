import { Component, inject, input, OnInit, output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../modules/Task';
import { TaskService } from '../../services/task.service';
import { MainTaskFormComponent } from '../main-task-form/main-task-form.component';
import { IconsService } from '../../services/icons.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [MainTaskFormComponent, NgClass],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
})
export class EditTaskModalComponent implements OnInit {
  private taskService = inject(TaskService);
  private iconService = inject(IconsService);
  private toastr = inject(ToastrService);
  taskId = input.required<number>();
  chosenTaskData!: Task;
  closeModal = output<void>();
  cancelIcon = this.iconService.getIcon('cancel');

  ngOnInit(): void {
    this.loadChosenTask();
  }

  loadChosenTask() {
    this.taskService.getUserTask(this.taskId()).subscribe({
      next: (task) => {
        this.chosenTaskData = task;
      },
    });
  }

  updateTask(model: any) {
    const updatedTask = { id: this.taskId(), ...model };
    console.log(updatedTask);
    this.taskService.updateUserTask(updatedTask).subscribe({
      next: () => {
        this.handleCloseModal();
        this.toastr.success('Task updated successfully!');
      },
    });
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
