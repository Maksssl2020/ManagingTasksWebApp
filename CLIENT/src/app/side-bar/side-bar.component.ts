import { Component } from '@angular/core';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [AddTaskModalComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  isAddTaskModalOpen = true;
}
