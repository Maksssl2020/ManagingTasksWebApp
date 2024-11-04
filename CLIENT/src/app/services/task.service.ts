import { HttpClient, HttpParams, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../models/Task';
import { TaskUpdateRequest } from '../models/TaskUpdateRequest';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  userTasks = signal<Task[]>([]);
  baseUrl = environment.apiUrl;

  addNewTask(model: any) {
    console.log(model);

    const savedTask = this.http
      .post<Task>(this.baseUrl.concat('to-do-tasks/save-task'), model)
      .subscribe({
        next: (task) => {
          this.userTasks.set([...this.userTasks(), task]);
        },
      });

    return of(savedTask);
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

  deleteUserTasks(tasksId: number[]) {
    const params = new HttpParams();

    tasksId.forEach((id) => {
      params.set('tasksId', id.toString());
    });

    return this.http
      .delete<HttpStatusCode>(this.baseUrl.concat('to-do-tasks/delete-tasks'), {
        params,
      })
      .pipe(
        tap({
          next: () => {
            this.userTasks.update((tasks) => {
              return tasks.filter((task) => !tasksId.includes(task.id));
            });
          },
        })
      );
  }

  getUserTasks() {
    return this.http
      .get<Task[]>(
        this.baseUrl.concat(
          `to-do-tasks/all/user/${this.authenticationService.currentUserId()}`
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

  getTasksIdsDependsOnProjectName(projectName: string): number[] {
    const tasksIds: number[] = [];

    this.userTasks().forEach((task) => {
      if (
        task.project.toLocaleLowerCase() === projectName.toLocaleLowerCase()
      ) {
        tasksIds.push(task.id);
      }
    });

    return tasksIds;
  }
}
