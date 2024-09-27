import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { IconsService } from '../services/icons.service';
import { NgClass } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task } from '../modules/Task';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgClass, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  private tasksService = inject(TaskService);
  private cdRef = inject(ChangeDetectorRef);
  userTasks = this.tasksService.loadedUserTasks;

  ngOnInit() {
    this.loadUserTasks();
  }

  loadUserTasks() {
    this.tasksService.getUserTasks().subscribe({
      // next: (tasks) => {
      //   this.userTasks.set(tasks);
      // },
    });
  }
}
