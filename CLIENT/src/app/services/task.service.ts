import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../modules/Task';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5179/api/';

  addNewTask(model: any) {
    return this.http
      .post<Task>(this.baseUrl.concat('to-do-tasks/save-task'), model)
      .pipe(
        map((task) => {
          return task;
        })
      );
  }
}
