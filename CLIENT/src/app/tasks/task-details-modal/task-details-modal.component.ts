import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { openCloseModalAnimation } from '../../animations/animations';
import { Task } from '../../modules/Task';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize-first-letter.pipe';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'app-task-details-modal',
  standalone: true,
  imports: [CapitalizeFirstLetterPipe, NgClass],
  templateUrl: './task-details-modal.component.html',
  styleUrl: './task-details-modal.component.scss',
  animations: [openCloseModalAnimation],
})
export class TaskDetailsModalComponent implements OnInit {
  private iconService = inject(IconService);
  taskData = input.required<Task>();
  isModalOpen: boolean = false;
  chosenTaskData?: Task;
  modalData: { label: string; taskData?: any }[] = [];
  cancelIcon?: string;
  closeModal = output<void>();

  ngOnInit(): void {
    this.cancelIcon = this.iconService.getIcon('cancel');

    if (this.taskData()) {
      setTimeout(() => {
        this.chosenTaskData = this.taskData();
        this.prepareTaskToDisplay();
        this.isModalOpen = true;
      });
    }
  }

  prepareTaskToDisplay() {
    this.modalData = [
      {
        label: 'Project',
        taskData: this.chosenTaskData?.project,
      },
      {
        label: 'Priority',
        taskData: this.chosenTaskData?.priority.toLowerCase(),
      },
      {
        label: 'Due Date',
        taskData: this.chosenTaskData?.deadline,
      },
      {
        label: 'Details',
        taskData: this.chosenTaskData?.details,
      },
    ];
  }

  handleCloseModal() {
    this.isModalOpen = false;
    this.chosenTaskData = undefined;

    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }
}
