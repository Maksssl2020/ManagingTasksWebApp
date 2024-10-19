import { Component, OnInit, output } from '@angular/core';
import { openCloseModalAnimation } from '../animations/animations';

@Component({
  selector: 'app-delete-warning-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-warning-modal.component.html',
  styleUrl: './delete-warning-modal.component.scss',
  animations: [openCloseModalAnimation],
})
export class DeleteWarningModalComponent implements OnInit {
  delete = output<void>();
  cancel = output<void>();
  isModalOpen: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isModalOpen = true;
    });
  }

  handleCancel() {
    this.isModalOpen = false;

    setTimeout(() => {
      this.cancel.emit();
    }, 300);
  }

  handleDelete() {
    this.isModalOpen = false;

    setTimeout(() => {
      this.delete.emit();
    }, 300);
  }
}
