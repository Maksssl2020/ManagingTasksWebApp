import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../modules/Task';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks$ = new BehaviorSubject<Task[]>([]);
  private authenticationService = inject(AuthenticationService);
  private http = inject(HttpClient);
  private userTasks = signal<Task[]>([]);
  baseUrl = environment.apiUrl;
  loadedUserTasks = this.userTasks.asReadonly();

  addNewTask(model: any) {
    return this.http
      .post<HttpStatusCode>(this.baseUrl.concat('to-do-tasks/save-task'), model)
      .pipe(
        map((task) => {
          return task;
        }),
        catchError((error) => {
          console.error('Error occurred while saving the task', error);
          return throwError(() => new Error('Failed to save task'));
        }),
        tap({
          next: (_) => {
            this.getUserTasks().subscribe();
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
        map((code) => {
          return code;
        }),
        tap({
          next: (_) => {
            this.getUserTasks().subscribe();
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
      .pipe(
        map((tasks) => {
          return tasks;
        }),
        tap({
          next: (tasks) => this.userTasks.set(tasks),
        })
      );
  }
}
