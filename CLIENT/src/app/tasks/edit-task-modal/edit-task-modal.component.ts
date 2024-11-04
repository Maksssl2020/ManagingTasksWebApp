import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { openCloseModalAnimation } from '../../animations/animations';
import { Task } from '../../models/Task';
import { IconService } from '../../services/icon.service';
import { TaskService } from '../../services/task.service';
import { MainTaskFormComponent } from '../main-task-form/main-task-form.component';
import { AppModalComponent } from '../../modals/app-modal/app-modal.component';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [MainTaskFormComponent, NgClass, AppModalComponent],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
  animations: [openCloseModalAnimation],
})
export class EditTaskModalComponent implements OnInit {
  private taskService = inject(TaskService);
  private iconService = inject(IconService);
  private toastr = inject(ToastrService);
  taskData = input.required<Task>();
  closeModal = output<void>();
  cancelIcon = this.iconService.getIcon('cancel');
  isModalOpen: boolean = false;

  ngOnInit(): void {
    if (this.taskData()) {
      setTimeout(() => {
        this.isModalOpen = true;
      });
    }
  }

  updateTask(model: any) {
    const updatedTask = { id: this.taskData().id, ...model };
    console.log(updatedTask);
    this.taskService.updateUserTask(updatedTask).subscribe({
      next: () => {
        this.handleCloseModal();
        this.toastr.success('Task updated successfully!');
      },
    });
  }

  handleCloseModal() {
    this.isModalOpen = false;

    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }
}
