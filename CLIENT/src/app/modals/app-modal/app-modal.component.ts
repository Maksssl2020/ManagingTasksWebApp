import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { openCloseModalAnimation } from '../../animations/animations';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-app-modal',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.scss',
  animations: [openCloseModalAnimation],
})
export class AppModalComponent {
  @Input() isModalOpen = false;
  @Input() modalContainerClass = '';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  onOverlayClick(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}
