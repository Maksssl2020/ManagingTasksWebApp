import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../modules/Task';
import { BehaviorSubject, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  private userTasks = signal<Task[]>([]);
  baseUrl = environment.apiUrl;
  loadedUserTasks = this.userTasks.asReadonly();

  addNewTask(model: any) {
    return this.http
      .post<HttpStatusCode>(this.baseUrl.concat('to-do-tasks/save-task'), model)
      .pipe(
        tap({
          next: () => {
            this.userTasks.update((tasks) => [...tasks, model]);
          },
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
          `to-do-tasks/all/user/${this.authenticationService.currentuser()?.id}`
        )
      )
      .subscribe({
        next: (tasks) => this.userTasks.set(tasks),
      });
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
}
