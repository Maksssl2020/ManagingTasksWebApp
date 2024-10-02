import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Project } from '../modules/Project';
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
          `projects/user-projects/${
            this.authenticationService.currentUser()?.id
          }`
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
          `projects/add-project/${this.authenticationService.currentUser()?.id}`
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
}
