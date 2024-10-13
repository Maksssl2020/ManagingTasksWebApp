import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task-priority-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './task-priority-button.component.html',
  styleUrl: './task-priority-button.component.scss',
})
export class TaskPriorityButtonComponent {
  priorityName = input.required<string>();
  isPrioritySelected = input.required<boolean>();
  selectedPriority = output<string>();

  getButtonStylingDependsOnPriorityName(name: string) {
    return `.button-overlay-${name}`;
  }

  getTextStylingDependsOnPriorityName(name: string) {
    return `.priority-button-text-${name}`;
  }

  getStylingDependsOnSelectedPriority(name: string) {
    return `priority-button-active priority-button-active-${name}`;
  }

  onPrioritySelect() {
    this.selectedPriority.emit(this.priorityName());
  }
}
