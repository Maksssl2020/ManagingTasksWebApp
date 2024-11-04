import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Project } from '../models/Project';
import { AuthenticationService } from './authentication.service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  baseUrl = environment.apiUrl;
  userProjects = signal<Project[]>([]);

  getUserProjects() {
    return this.http
      .get<Project[]>(
        this.baseUrl.concat(
          `projects/user-projects/${this.authenticationService.currentUserId()}`
        )
      )
      .pipe(
        tap({
          next: (p) => this.userProjects.set(p),
        })
      );
  }

  saveUserProject(model: any) {
    const savedProject = this.http
      .post<Project>(
        this.baseUrl.concat(
          `projects/add-project/${this.authenticationService.currentUserId()}`
        ),
        model
      )
      .subscribe({
        next: (addedProject) => {
          this.userProjects.set([...this.userProjects(), addedProject]);
        },
      });

    return of(savedProject);
  }

  getProjectIdByItsName(projectName: string) {
    return this.userProjects()
      .filter((project) => project.title === projectName)
      ?.at(0)?.id;
  }

  deleteUserProject(id: number) {
    return this.http
      .delete<HttpStatusCode>(
        this.baseUrl.concat(`projects/delete-project/${id}`)
      )
      .pipe(
        tap({
          next: () => {
            this.userProjects.update((projects) => {
              return projects.filter((project) => project.id !== id);
            });
          },
        })
      );
  }
}
