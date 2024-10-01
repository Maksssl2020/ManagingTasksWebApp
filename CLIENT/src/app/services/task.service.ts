import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../modules/Task';
import { BehaviorSubject, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { TaskUpdateRequest } from '../modules/TaskUpdateRequest';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  userTasks = signal<Task[]>([]);
  baseUrl = environment.apiUrl;

  addNewTask(model: any) {
    return this.http
      .post<HttpStatusCode>(this.baseUrl.concat('to-do-tasks/save-task'), model)
      .pipe(
        tap(() => {
          this.userTasks.update((tasks) => [...tasks, model]);
        })
      );
  }

  deleteUserTask(id: number) {
    return this.http
      .delete<HttpStatusCode>(
        this.baseUrl.concat(`to-do-tasks/delete-task/${id}`)
      )
      .pipe(
        tap({
          next: () => {
            this.userTasks.update((tasks) =>
              tasks.filter((task) => task.id !== id)
            );
          },
        })
      );
  }

  getUserTasks() {
    return this.http
      .get<Task[]>(
        this.baseUrl.concat(
          `to-do-tasks/all/user/${this.authenticationService.currentUser()?.id}`
        )
      )
      .pipe(
        tap({
          next: (t) => this.userTasks.set(t),
        })
      );
  }

  getUserTask(id: number) {
    const task = this.userTasks().find((tasks) => tasks.id === id);

    if (task !== undefined) {
      return of(task);
    }

    return this.http.get<Task>(
      this.baseUrl.concat(`to-do-tasks/get-task/${id}`)
    );
  }

  updateUserTask(updatedTask: TaskUpdateRequest) {
    console.log(updatedTask);

    return this.http
      .put(this.baseUrl.concat(`to-do-tasks/update-task`), updatedTask)
      .pipe(
        tap(() => {
          this.userTasks.update((tasks) =>
            tasks.map((currentTask) => {
              if (currentTask.id === updatedTask.id) {
                return { ...currentTask, ...updatedTask };
              }

              return currentTask;
            })
          );
        })
      );
  }
}
