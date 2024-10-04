import { Component, output } from '@angular/core';

@Component({
  selector: 'app-delete-warning-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-warning-modal.component.html',
  styleUrl: './delete-warning-modal.component.scss',
})
export class DeleteWarningModalComponent {
  delete = output<void>();
  cancel = output<void>();

  handleCancel() {
    this.cancel.emit();
  }

  handleDelete() {
    this.delete.emit();
  }
}
